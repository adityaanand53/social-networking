import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { PostFormData, User } from '../common/interfaces';
import { PostsService } from '../services/posts.service';
import { RestAPIService } from '../services/rest-api.service';
import { AppDataService } from '../services/app-data.service';

@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.scss']
})
export class AddPostsComponent implements OnInit {
  public description = '';
  public mediaFile = '';
  public userData: User;

  constructor(private apiHandler: RestAPIService, private appService: AppDataService, private postService: PostsService) { }

  ngOnInit(): void {
    this.appService.userData.subscribe(data => {
      if (data) this.userData = data;
    })

  }

  postHandler() {
    if (!this.mediaFile && !this.description) {
      alert('Write something or add an image or video!')
      return;
    }
    const postData: PostFormData = {
      description: this.description,
      likedBy: [],
      fileUrl: this.mediaFile,
      user: this.userData.id
    }
    this.appService.setIsLoading(true);
    this.apiHandler.createNewPost(postData).pipe(take(1)).subscribe(async (res) => {
      this.mediaFile = '';
      this.description = '';
      const allPosts = await this.apiHandler.getPosts().toPromise();
      this.postService.updatePosts(allPosts);
      this.appService.setIsLoading(false);
    }, err => {
      this.appService.setIsLoading(false);
    });
  }

  public checkURL(url) {
    if (url && url.match(/\.(jpeg|jpg|gif|png)$/)) {
      return 'img';
    } else if (url && url.match(/\.(mp4)$/)) {
      return 'video';
    }
    return '';
  }

}
