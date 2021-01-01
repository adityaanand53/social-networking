import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Posts, User } from '../common/interfaces';
import { PostsService } from '../services/posts.service';
import { RestAPIService } from '../services/rest-api.service';
import { AppDataService } from '../services/app-data.service';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.scss']
})
export class ViewPostsComponent implements OnInit {
  public posts: Posts[];
  public baseUrl = environment.apiUrl;
  public userData: User;

  constructor(private apiService: RestAPIService, private userService: AppDataService, private postsService: PostsService) { }

  ngOnInit(): void {
    this.userService.userData.subscribe(async (data) => {
      if (data) {
        this.userData = data;
        const allPosts = await this.apiService.getPosts().toPromise();
        this.postsService.updatePosts(allPosts);
      }

    });

    this.postsService.userPosts.subscribe(posts => {
      this.posts = posts;
    });
  }

  likeHandler(post: Posts) {
    post.likedBy[this.userData.id] = !post.likedBy[this.userData.id];
    this.apiService.updateLikeStatus(post.id, this.userData.id).subscribe((res: any) => {
      if (res && res.success) {
        post.likedBy[this.userData.id] = res.data.likedBy[this.userData.id];
      }
    });
  }
}
