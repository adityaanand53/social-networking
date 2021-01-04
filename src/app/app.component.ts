import { Component, OnInit } from '@angular/core';

import { RestAPIService } from './services/rest-api.service';
import { AppDataService } from './services/app-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoading = true;
  constructor(public appService: AppDataService, private apiService: RestAPIService) { }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.appService.setIsLoading(true);
      const userData = JSON.parse(atob(token.split('.')[1]));
      this.fetchUserData(userData.id);
    }

    this.appService.isLoading.subscribe(value => {
      this.isLoading = value;
    })
  }

  async fetchUserData(id: number) {
    try {
      const userData = await this.apiService.getUserData(id).toPromise();
      this.appService.updateUserData(userData);
      this.appService.setIsLoading(false);
    } catch (err) {
      this.appService.setIsLoading(false);
    }
  }
}
