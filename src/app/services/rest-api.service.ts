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
    return this.http.get(`${environment.apiUrl}/users`);
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
    // const formData = new FormData();
    // formData.append('mediaContent', file);
    // formData.append('description', postData.description);
    // formData.append('likedBy', postData.likedBy);
    // const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });

    return this.http.post(`${environment.apiUrl}/posts`, postData);
  }

  updateLikeStatus(postId: number, likedByUserId: number) {
    this.http.post(`${environment.apiUrl}/posts/${postId}/${likedByUserId}`, {});
  }

  updateFriendStatus(userId: number, friendUserId: number) {
    this.http.post(`${environment.apiUrl}/users/${userId}/${friendUserId}`, {});
  }
}
