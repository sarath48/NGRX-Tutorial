import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appState } from 'src/app/store/app.state';
import { deletePost, loadPosts } from '../state/post.action';
import { Post } from '../state/post.state';
import { getPosts } from '../state/posts.selector';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  posts$!: Observable<Post[] | null>;
  constructor(private store: Store<appState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
    this.posts$ = this.store.select(getPosts);
  }
  deletePost(id: any) {
    if (confirm('Are you sure you want to delete the post')) {
      this.store.dispatch(deletePost({ id }));
    }
  }
}
