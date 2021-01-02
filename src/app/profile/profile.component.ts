import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '../common/interfaces';
import { AppDataService } from '../services/app-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public userData: User;
  private subscription: Subscription;
  constructor(private appService: AppDataService) { }

  ngOnInit(): void {
    this.subscription = this.appService.userData.subscribe((user: User) => {
      if (user) this.userData = user;
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
