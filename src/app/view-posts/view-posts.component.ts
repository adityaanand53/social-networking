import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Posts } from '../common/interfaces';
import { PostsService } from '../services/posts.service';
import { RestAPIService } from '../services/rest-api.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.scss']
})
export class ViewPostsComponent implements OnInit {
  public posts: Posts[];
  public baseUrl = environment.apiUrl;

  constructor(private apiService: RestAPIService, private userService: UserService, private postsService: PostsService) { }

  ngOnInit(): void {
    this.userService.userData.subscribe(async (data) => {
      const allPosts = await this.apiService.getPosts().toPromise();
      this.postsService.updatePosts(allPosts);
    });

    this.postsService.userPosts.subscribe(posts => {
      this.posts = posts;
    })
  }
}
