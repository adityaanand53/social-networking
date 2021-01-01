import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Posts, User } from '../common/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private userPostsSource = new BehaviorSubject<Posts[]>(null);
  public userPosts = this.userPostsSource.asObservable();

  constructor() { }

  updatePosts(data: Posts[]) {
    this.userPostsSource.next(data);
  }
}
