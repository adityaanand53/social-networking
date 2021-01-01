import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { LoginResponse, RegisterResponse } from '../common/interfaces';

import { take } from 'rxjs/operators';
import { RestAPIService } from '../services/rest-api.service';
import { loginConfig } from './login.config';
import { UserService } from '../services/user.service';

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

  constructor(public fb: FormBuilder, private apiService: RestAPIService, private userService: UserService) { }

  ngOnInit(): void {
    this.getFormGroup()
  }

  public getFormGroup() {
    this.formGroup = this.formConfig['loginForm'](this.fb).formGroup;
  }

  public loginHandler() {
    this.userService.setIsLoading(true);
    if (this.isNewAccount) {
      this.apiService.createNewUser(this.formGroup.value).pipe(take(1)).subscribe((res: RegisterResponse) => {
        if (res && res.success) {
          this.isNewAccount = false;
        }
        this.userService.setIsLoading(false);
      }, err => {
        this.userService.setIsLoading(false);
        console.log(err);
      })
    } else  {
      this.apiService.authenticateUser(this.formGroup.value).pipe(take(1)).subscribe(async (res: LoginResponse) => {
        if (res && res.success) {
          sessionStorage.setItem("token", res.token);
          const userData = await this.apiService.getUserData(res.id).toPromise();
          this.userService.updateUserData(userData);
        }
        this.userService.setIsLoading(false);
      }, err => {
        this.userService.setIsLoading(false);
        console.log(err);
      })
    }
  }

}
