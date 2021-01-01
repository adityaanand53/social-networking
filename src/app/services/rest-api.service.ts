import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PostFormData, Posts, User } from '../common/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RestAPIService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/posts`);
  }

  getAllUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getUserData(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  authenticateUser(userData: User) {
    return this.http.post(`${environment.apiUrl}/users/login`, userData);
  }

  createNewUser(userData: User) {
    return this.http.post(`${environment.apiUrl}/users/register`, userData);
  }

  createNewPost(postData: PostFormData) {
    return this.http.post(`${environment.apiUrl}/posts`, postData);
  }

  updateLikeStatus(postId: number, likedByUserId: number) {
    return this.http.post(`${environment.apiUrl}/posts/${postId}/${likedByUserId}`, {});
  }

  updateFriendStatus(friendUserId: number) {
    return this.http.post(`${environment.apiUrl}/friends/${friendUserId}`, {});
  }

  searchFriends(searchBy: string) {
    if (!searchBy) searchBy = '~';
    return this.http.get<User[]>(`${environment.apiUrl}/friends/search/${searchBy}`, {});
  }
}
