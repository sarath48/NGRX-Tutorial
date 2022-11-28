import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/store/app.state';
import { editPost } from '../state/post.action';
import { Post } from '../state/post.state';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  postForm!: FormGroup;
  postData!: Post;
  constructor(
    private route: ActivatedRoute,
    private store: Store<appState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      const id = data['id'];

      this.store.select(getPostById, { id }).subscribe((post) => {
        this.postData = post;
        this.postForm = new FormGroup({
          title: new FormControl(this.postData.title, [
            Validators.required,
            Validators.minLength(6),
          ]),
          description: new FormControl(this.postData.description, [
            Validators.required,
            Validators.minLength(10),
          ]),
        });
      });
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

  updatePost() {
    if (this.postForm.invalid) {
      return;
    }

    const post: Post = {
      id: this.postData.id,
      title: this.postForm.value.title,
      description: this.postForm.value.description,
    };

    this.store.dispatch(editPost({ post }));
    this.router.navigate(['/posts']);
  }
}
