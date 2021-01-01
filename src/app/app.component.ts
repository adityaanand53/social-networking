import { Component, OnInit } from '@angular/core';
import { RestAPIService } from './services/rest-api.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'PB: Social Network';
  public isLoading = true;
  constructor(public userService: UserService, private apiService: RestAPIService) { }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.userService.setIsLoading(true);
      const userData = JSON.parse(atob(token.split('.')[1]));
      this.fetchUserData(userData.id);
    }

    this.userService.isLoading.subscribe(value => {
      this.isLoading = value;
    })
  }

  async fetchUserData(id: number) {
    try {
      const userData = await this.apiService.getUserData(id).toPromise();
      this.userService.updateUserData(userData);
      this.userService.setIsLoading(false);
    } catch (err) {
      this.userService.setIsLoading(false);
    }
  }
}
