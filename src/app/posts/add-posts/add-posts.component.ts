import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/store/app.state';
import { addPost } from '../state/post.action';
import { Post } from '../state/post.state';

@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.css'],
})
export class AddPostsComponent implements OnInit {
  postForm!: FormGroup;
  constructor(private store: Store<appState>) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  showDescriptionError() {
    let description!: string;

    if (
      this.postForm.get('description')?.touched &&
      this.postForm.get('description')?.invalid
    ) {
      if (this.postForm.get('description')?.errors?.['required']) {
        description = 'Description is required';
      }

      if (this.postForm.get('description')?.errors?.['minlength']) {
        description = 'Description should contain atleast 10 characters';
      }
    }
    return description;
  }

  addPost() {
    if (this.postForm.invalid) {
      return;
    }

    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description,
    };

    this.store.dispatch(addPost({ post }));
    this.postForm.reset();
  }
}
