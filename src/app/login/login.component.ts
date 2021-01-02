import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { ErrorResponse, LoginResponse, RegisterResponse } from '../common/interfaces';

import { take } from 'rxjs/operators';
import { RestAPIService } from '../services/rest-api.service';
import { loginConfig } from './login.config';
import { AppDataService } from '../services/app-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CONSTANTS } from '../common/constants';

export const FORM_CONFIGS = {
  loginForm: loginConfig,
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isNewAccount = false;
  public formGroup: FormGroup;
  public formConfig: any = FORM_CONFIGS;
  constructor(public fb: FormBuilder, private apiService: RestAPIService, private appService: AppDataService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getFormGroup()
  }

  get ctrls() {
    return this.formGroup.controls;
  }

  public getFormGroup(): void {
    this.formGroup = this.formConfig['loginForm'](this.fb).formGroup;
  }

  public createAccountHandler(): void {
    this.isNewAccount = !this.isNewAccount;
    if (this.isNewAccount) {
      this.ctrls.username.setValidators([Validators.required]);
      this.ctrls.name.setValidators([Validators.required]);
    } else {
      this.ctrls.username.setValidators(null);
      this.ctrls.name.setValidators(null);
    }
    this.ctrls.name.markAsPending();
  }

  public loginHandler(): void {
    if (this.formGroup.valid) {
      this.appService.setIsLoading(true);
      if (this.isNewAccount) {
        this.handleNewUser();
      } else {
        this.handleRegisteredUser();
      }
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  private handleRegisteredUser(): void {
    this.apiService.authenticateUser(this.formGroup.value).pipe(take(1)).subscribe(async (res: LoginResponse) => {
      console.log(res);
      if (res && res.success) {
        sessionStorage.setItem("token", res.token);
        const userData = await this.apiService.getUserData(res.id).toPromise();
        this.appService.updateUserData(userData);
      } else {
        this.snackBar.open(res.message || CONSTANTS.DEFAULT_ERROR, 'Okay', {
          duration: 5000
        })
      }
      this.appService.setIsLoading(false);
    }, err => {
      this.snackBar.open((err.error && err.error.message) || CONSTANTS.DEFAULT_ERROR, 'Okay', {
        duration: 5000
      })
      this.appService.setIsLoading(false);
      console.log(err);
    })
  }

  private handleNewUser(): void {
    this.apiService.createNewUser(this.formGroup.value).pipe(take(1)).subscribe((res: RegisterResponse) => {
      if (res && res.success) {
        this.isNewAccount = false;
      } else {
        this.snackBar.open(res.message || CONSTANTS.DEFAULT_ERROR, 'Okay', {
          duration: 5000
        })
      }
      this.appService.setIsLoading(false);
    }, err => {
      this.snackBar.open((err.error && err.error.message) || CONSTANTS.DEFAULT_ERROR, 'Okay', {
        duration: 5000
      })
      this.appService.setIsLoading(false);
      console.log(err);
    })
  }

  get serializedErrors() {
    return {
      email: 'Invalid email',
      password: 'Invalid password',
      name: 'Invalid name',
      username: 'Invalid username'
    };
  }

}
