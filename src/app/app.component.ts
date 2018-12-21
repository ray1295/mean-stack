import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}

/*
PUSH -> [ this.posts.push(post) ] -> Pushing new post on to posts list array.
PARAMETER -> [ onPostAdded(post) ]
INTERFACE STATIC TYPING -> [ storedPosts: IPost[] = []; ] -> Type is of IPost - array of post
*/
