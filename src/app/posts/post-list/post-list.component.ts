import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPost } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit, OnDestroy {
  posts: IPost[] = [];
  private postsSub: Subscription;
  constructor(
    public postsService: PostsService
  ) { }
  ngOnInit() {
    this.posts = this.postsService.getPost();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: IPost[]) => {
        this.posts = posts;
      });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}

/*
  --------------------------------------------------------------------------
  | posts = [
  |   {title: 'First Post', content: 'This is the first post\s content'},
  |   {title: 'Second Post', content: 'This is the second post\s content'},
  |   {title: 'Third Post', content: 'This is the third post\s content'}
  | ];
  --------------------------------------------------------------------------
@COMPONENT DECORATOR
ARRAY OBJECT -> [ post = [{}] ]
DIRECTIVES -> Allows us to manipulate elements in the DOM-(Document Object Model).
  |-- STRUCTURAL DIRECTIVES -> Instructions you place on elements - structurally changes the HTML code.
    |-- [ *ngFor="let property of property name" ] -> Dynamically loop through data.
    |-- [ *ngIf="condition" ] -> If condition is true renders all components within.
      |-- CONDITION -> i.e. Function, Property, or short code snippet.
@INPUT DECORATOR -> [ @Input() posts = []; ] -> Binding to post from the outisde.
CONSTRUCTOR -> Fucntion called when angular creates new instance of the component.
    |-- DEPENDENCY INJECTION -> [ constructor(postsService: PostsService) {} ] ->
LIFECYCLE HOOKS ->
  |-- [ ngOnInit() {} ] -> Code angular automatically executes when it creates a component.
    |-- [ this.posts = this.postsService.getPost(); ] -> Fetching all the posts.
  |-- [ ngOnDestroy() {} ] ->
SUBSCRIBE -> [ .subscribe(); ] ->
    |-- [ next() ] -> Called wehenevr new data emitted.
    |-- [ error() ] -> Called whenerver error is emitted.
    |-- [ () ] -> Called whenever code completes.
UNSUBSCRIBE -> [ .unsubscribe(); ] ->
SUBSCRIPTION -> [ import { Subscription } ]
*/
