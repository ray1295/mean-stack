import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IPost } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: IPost[] = [];
  private postsUpdated = new Subject<IPost[]>();
  getPost() {
    return [...this.posts];
  }
  addPost(title: string, content: string) {
    const post: IPost = { title: title, content: content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
}

/*
IPOST[] = [] -> [ = [] ] -> Setting post to empty.
VARAIBLE:
  |-- PRIMITIVE VALUES -> [ 6 types ] -> undefined, null, boolean, number, string, and symbol
  |-- REFERENCE -> [ 2 type ] -> Objects and Arrays.
    |-- When copied just pointing to object.
SPREAD OPERATOR -> [ ... ] -> Spreads out elements of an array or a string.
  |-- [ return [..this.posts]; ]
[ getPost() ] -> Method for getting posts.
[ addPost() ] -> Method for adding new posts.
@INJECTABLE DECORATOR-> [ @Injectable() ] ->
  |-- [ @Injectable({providedIn: 'root'}) ] -> Provides service on the root level.
    |-- Angular creates only one instance of service in entire app.
RXJS -> [ Observables ] -> Objects that allows us to pass data around.
  |-- SUBJECT -> [ import { Subject } ] ->
    |-- [   private postsUpdated = new Subject<IPost[]>(); ] ->
  |-- NEXT-> [ this.postsUpdated.next([...this.posts]); ] ->
  | [ asObservanles() ] -> Returns an object which can listen but can't emit.
*/
