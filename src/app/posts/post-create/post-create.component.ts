import { Component, EventEmitter, Output } from '@angular/core';
import { IPost } from '../post.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  @Output() postCreated = new EventEmitter<IPost>();
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: IPost = {
      title: form.value.title,
      content: form.value.content
    };
    this.postCreated.emit(post);
  }
}

/*
PROPERTY -> [ newPost ] -> a varaible in a class.
EVENT METHOD -> [ onAddPost() ] -> Add 'on' in methods names that are triggered upn an event.
BACKSLASH -> [ \ ] -> Allows quotation marks inside a string.
METHOD ARGUMENT -> [ onAddInput(postInput: HtmlTextAreaElement) ]
  |-- onAddInput(postInput) -> Expecting postInput as an argument.
  |-- HtmlTextAreaElement -> Informing TS about type - get better autocompletion.
    |-- VALUE -> [ postInput.value ] -> Accessing postInput value property.
CONSTANT -> [ const post = {} ] -> Store in const when you're not changing value.
EMIT EVENT -> [ postCreated = new EventEmitter<IPost>() ]
  |-- [ EventEmitter<IPost>() ] -> Eventemitter is a generic type.
    |-- GENERIC TYPE -> can pass additional information about type of data -> Data is of <IPost>.
  |-- [ this.postCreated.emit(post) ] -> To emit event - passing post as argument.
@OUTPUT DECORATOR -> [ @Output() postCreated ] -> Turning event which can be listened to by related components.
TWO-WAY BINDING -> [ [(ngModel)]="enteredTitle" ]
ANGULAR FORMS -> [ onAddPost(form: NgForm) ]
*/
