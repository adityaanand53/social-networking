import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'src/app/common/interfaces';
import { AppDataService } from 'src/app/services/app-data.service';
import { RestAPIService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-list-friends',
  templateUrl: './list-friends.component.html',
  styleUrls: ['./list-friends.component.scss']
})
export class ListFriendsComponent implements OnInit {

  public users: User[];

  constructor(private appService: AppDataService, private apiService: RestAPIService) { }

  ngOnInit(): void {
    this.loadFriends();
    this.listFriends();
  }

  public removeFriendHandler(id: number) {
    this.apiService.deleteFriend(id).pipe(take(1)).subscribe(async (res) => {
      if (res) {
        this.loadFriends();
        const allPosts = await this.apiService.getPosts(0).toPromise();
        this.appService.updatePosts(allPosts);
      }
    })
  }

  private loadFriends() {
    this.apiService.getFriends().pipe(take(1)).subscribe(res => {
      if (res && res.length) {
        this.appService.updateFriends(res);
      }
    })
  }

  private listFriends() {
    combineLatest([this.appService.userData, this.appService.friendsData])
      .subscribe(([userData, friendsData]) => {
        if (userData) {
          this.users = friendsData;
        }
      });
  }
}
