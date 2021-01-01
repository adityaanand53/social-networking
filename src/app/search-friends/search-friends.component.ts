import { Component, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, take } from 'rxjs/operators';
import { User } from '../common/interfaces';
import { AppDataService } from '../services/app-data.service';
import { RestAPIService } from '../services/rest-api.service';

@Component({
  selector: 'app-search-friends',
  templateUrl: './search-friends.component.html',
  styleUrls: ['./search-friends.component.scss']
})
export class SearchFriendsComponent implements OnInit {
  public users: User[];
  public search = '';
  public searchFriend$ = new Subject<string>();
  constructor(private apiService: RestAPIService, private appService: AppDataService) { }

  ngOnInit(): void {
    combineLatest([this.appService.userData, this.apiService.getAllUsers()])
      .subscribe(([userData, allusers]) => {
        this.users = allusers;
      })

    this.searchFriends();
  }

  public addFreindHandler(freindId: number) {
    this.apiService.updateFriendStatus(freindId).subscribe(console.log)
  }

  public searchFriends() {
    this.searchFriend$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(query => this.apiService.searchFriends(query))
    ).subscribe(data => {
      this.users = data;
    });
  }
}
