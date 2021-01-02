import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Posts, User } from '../common/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  private userSource = new BehaviorSubject<User>(null);
  public userData = this.userSource.asObservable();

  private friendsSource = new BehaviorSubject<User[]>(null);
  public friendsData = this.friendsSource.asObservable();

  private postsSource = new BehaviorSubject<Posts[]>(null);
  public userPosts = this.postsSource.asObservable();

  private isLoadingSource = new BehaviorSubject<boolean>(false);
  public isLoading = this.isLoadingSource.asObservable();

  constructor() { }

  updateUserData(data: User) {
    this.userSource.next(data);
  }

  setIsLoading(data: boolean) {
    this.isLoadingSource.next(data);
  }

  updateFriends(data: User[]) {
    this.friendsSource.next(data);
  }

  updatePosts(data: Posts[]) {
    this.postsSource.next(data);
  }
}
