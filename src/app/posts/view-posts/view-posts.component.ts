import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LikedBy, Posts, User } from '../../common/interfaces';
import { RestAPIService } from '../../services/rest-api.service';
import { AppDataService } from '../../services/app-data.service';

import { CONSTANTS } from 'src/app/common/constants';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.scss']
})
export class ViewPostsComponent implements OnInit {
  public posts: Posts[];
  public baseUrl = environment.apiUrl;
  public userData: User;
  private start = 0;
  private subscriptionArr: Subscription[] = [];

  constructor(private apiService: RestAPIService, private appService: AppDataService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const subsA = this.appService.userData.subscribe(async (data) => {
      if (data) {
        this.userData = data;
        this.loadPosts(this.start);
      }
    });

    const subsB = this.appService.userPosts.subscribe(posts => {
      if (posts) {
        this.posts = posts;
      }
    });

    this.subscriptionArr.push(subsA);
    this.subscriptionArr.push(subsB);
  }

  ngOnDestroy() {
    this.subscriptionArr.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    })
  }

  public loadMoreHandler() {
    this.start += 5;
    this.loadPosts(this.start);
  }

  public likeCount(likedBy: LikedBy): string {
    const count = likedBy ? Object.keys(likedBy).filter(l => likedBy[l]).length : 0;
    if (count) {
      return `${count} ${count > 1 ? 'likes' : 'like'}`
    }
    return '';
  }

  private async loadPosts(start: number) {
    let allPosts = await this.apiService.getPosts(start).toPromise();
    allPosts = [...(this.posts && this.posts.length ? this.posts : []), ...allPosts];
    this.appService.updatePosts(allPosts);
  }

  public likeHandler(post: Posts) {
    if (!post.likedBy) {
      post.likedBy = {};
    }
    post.likedBy[this.userData.id] = !post.likedBy[this.userData.id];
    this.apiService.updateLikeStatus(post.id, this.userData.id)
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res && res.success) {
          post.likedBy[this.userData.id] = res.data.likedBy[this.userData.id];
        } else {
          this.snackBar.open(res.message || CONSTANTS.DEFAULT_ERROR, 'Okay', {
            duration: 5000
          })
        }
      }, err => {
        this.snackBar.open(err.error.message || CONSTANTS.DEFAULT_ERROR, 'Okay', {
          duration: 5000
        })
      });
  }

  deletePostHandler(postId: number) {
    this.appService.setIsLoading(true);
    this.apiService.deletePost(postId).pipe(take(1)).subscribe(res => {
      if (res) {
        const activePosts = this.posts.filter(post => post.id !== postId);
        this.appService.updatePosts(activePosts);
      }
      this.appService.setIsLoading(false);
    }, err => {
      this.appService.setIsLoading(false);
    })
  }
}
