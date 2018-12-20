import { Component, Input } from '@angular/core';
import { IPost } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent {
  @Input() posts: IPost[] = [];
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
DIRECTIVES -> Allows to manipulate elements in the DOM.
  |-- STRUCTURAL DIRECTIVES -> Instructions you place on elements - structurally changes the HTML code.
    |-- [ *ngFor="let property of property name" ] -> Dynamically loop through data.
    |-- [ *ngIf="condition" ] -> If condition is true renders all components within.
      |-- CONDITION -> i.e. Function, Property, or short code snippet.
@INPUT DECORATOR -> [ @Input() posts = []; ] -> Binding to post from the outisde.
*/
