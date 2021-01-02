import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { combineLatest, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, take } from 'rxjs/operators';

import { CONSTANTS } from 'src/app/common/constants';
import { AddFriendResponse, User } from '../../common/interfaces';
import { AppDataService } from '../../services/app-data.service';
import { RestAPIService } from '../../services/rest-api.service';

@Component({
  selector: 'app-search-friends',
  templateUrl: './search-friends.component.html',
  styleUrls: ['./search-friends.component.scss']
})
export class SearchFriendsComponent implements OnInit, OnDestroy {
  public users: User[];
  public search = '';
  public searchFriend$ = new Subject<string>();
  private subscription: Subscription;
  constructor(private apiService: RestAPIService, private appService: AppDataService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getFriendSuggestions();
    this.searchFriends();
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public addFriendHandler(freindId: number) {
    this.appService.setIsLoading(true);
    this.apiService.addFriend(freindId).pipe(take(1)).subscribe(async (res: AddFriendResponse) => {
      if (res && res.success) {
        this.getFriendSuggestions();
        this.loadFriends();
        const allPosts = await this.apiService.getPosts(0).toPromise();
        this.appService.updatePosts(allPosts);
      } else {
        this.snackBar.open(res.message || CONSTANTS.DEFAULT_ERROR, 'Okay', {
          duration: 5000
        });
      }
    }, err => {
      this.snackBar.open(err.error.message || CONSTANTS.DEFAULT_ERROR, 'Okay', {
        duration: 5000
      });
    }, () => this.appService.setIsLoading(false))
  }

  private searchFriends() {
    this.subscription = this.searchFriend$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(query => this.apiService.searchFriends(query))
    ).subscribe(data => {
      this.users = data;
    });
  }

  private getFriendSuggestions() {
    combineLatest([this.appService.userData, this.apiService.getFriendSuggestions()])
      .pipe(take(1))
      .subscribe(([userData, allusers]) => {
        if (userData) {
          this.users = allusers;
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
}
