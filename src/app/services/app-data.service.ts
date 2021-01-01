import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../common/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  private userSource = new BehaviorSubject<User>(null);
  public userData = this.userSource.asObservable();

  private isLoadingSource = new BehaviorSubject<boolean>(false);
  public isLoading = this.isLoadingSource.asObservable();

  constructor() { }

  updateUserData(data: User) {
    this.userSource.next(data);
  }

  setIsLoading(data: boolean) {
    this.isLoadingSource.next(data);
  }
}
