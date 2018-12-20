import { Component } from '@angular/core';
import { IPost } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  storedPosts: IPost[] = [];
  onPostAdded(post: any) {
    this.storedPosts.push(post);
  }
}

/*
PUSH -> [ this.posts.push(post) ] -> Pushing new post on to posts list array.
PARAMETER -> [ onPostAdded(post) ]
INTERFACE STATIC TYPING -> [ storedPosts: IPost[] = []; ] -> Type is of IPost - array of post
*/
