import { Component, OnInit } from '@angular/core';
import { User } from '../common/interfaces';
import { AppDataService } from '../services/app-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userData: User;
  constructor(private appService: AppDataService) { }

  ngOnInit(): void {
    this.appService.userData.subscribe((user: User) => {
      if (user) this.userData = user;
    })
  }

}
