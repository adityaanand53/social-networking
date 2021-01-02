import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { PostFormData, User } from '../../common/interfaces';
import { RestAPIService } from '../../services/rest-api.service';
import { AppDataService } from '../../services/app-data.service';
import { CONSTANTS } from 'src/app/common/constants';

@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.scss']
})
export class AddPostsComponent implements OnInit, OnDestroy {
  public description = '';
  public mediaFile = '';
  public userData: User;
  private subscription: Subscription;
  constructor(private apiHandler: RestAPIService, private appService: AppDataService, private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.subscription = this.appService.userData.subscribe(data => {
      if (data) this.userData = data;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  postHandler(): void {
    if (!this.mediaFile && !this.description) {
      this.snackBar.open(CONSTANTS.POST_VALIDATION_MSG, 'Okay', {
        duration: 5000
      });
      return;
    }
    const postData: PostFormData = {
      description: this.description,
      likedBy: {},
      fileUrl: this.mediaFile,
      user: this.userData.id
    }
    this.appService.setIsLoading(true);
    this.apiHandler.createNewPost(postData).pipe(take(1)).subscribe(async (res) => {
      this.mediaFile = '';
      this.description = '';
      const allPosts = await this.apiHandler.getPosts(0).toPromise();
      this.appService.updatePosts(allPosts);
      this.appService.setIsLoading(false);
    }, err => {
      this.appService.setIsLoading(false);
    });
  }

  public checkURL(url) {
    if (url && url.match(/\.(jpeg|jpg|gif|png|svg)$/)) {
      return 'img';
    } else if (url && url.match(/\.(mp4)$/)) {
      return 'video';
    }
    return '';
  }

}
