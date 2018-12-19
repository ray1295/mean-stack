import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  enteredValue = '';
  newPost = 'NO CONTENT';
  onAddPost(postInput: HTMLTextAreaElement) {
    this.newPost = this.enteredValue;
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
*/
