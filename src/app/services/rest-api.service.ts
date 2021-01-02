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

  // user APIs
  getUserData(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  getPosts(start: number): Observable<any> {
    return this.http.get<Posts[]>(`${environment.apiUrl}/users/posts?start=${start}`);
  }

  getFriendSuggestions() {
    return this.http.get<User[]>(`${environment.apiUrl}/users/suggestions`);
  }

  getFriends() {
    return this.http.get<User[]>(`${environment.apiUrl}/users/friend`);
  }

  authenticateUser(userData: User) {
    return this.http.post(`${environment.apiUrl}/users/login`, userData);
  }

  createNewUser(userData: User) {
    return this.http.post(`${environment.apiUrl}/users/register`, userData);
  }

  // posts APIs
  createNewPost(postData: PostFormData) {
    return this.http.post(`${environment.apiUrl}/posts`, postData);
  }

  deletePost(postId: number) {
    return this.http.delete(`${environment.apiUrl}/posts/${postId}`);
  }

  updateLikeStatus(postId: number, likedByUserId: number) {
    return this.http.post(`${environment.apiUrl}/posts/${postId}/${likedByUserId}`, {});
  }

  // friends APIs
  addFriend(friendUserId: number) {
    return this.http.post(`${environment.apiUrl}/friends/${friendUserId}`, {});
  }

  deleteFriend(friendRecordId: number) {
    return this.http.delete(`${environment.apiUrl}/friends/${friendRecordId}`);
  }

  searchFriends(searchBy: string) {
    if (!searchBy) searchBy = '~';
    return this.http.get<User[]>(`${environment.apiUrl}/friends/search/${searchBy}`, {});
  }
}
