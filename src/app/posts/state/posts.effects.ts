import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { PostService } from 'src/app/services/posts.service';
import {
  addPost,
  loadPosts,
  loadPostsSuccess,
  addPostSuccess,
  editPost,
  editPostSuccess,
  deletePost,
  deletePostSuccess,
} from './post.action';

@Injectable()
export class PostEffects {
  constructor(private actions$: Actions, private postService: PostService) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      mergeMap((action) => {
        return this.postService.getPost().pipe(
          map((posts) => {
            return loadPostsSuccess({ posts });
          })
        );
      })
    );
  });

  addPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postService.addPost(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.name };
            return addPostSuccess({
              post,
            });
          })
        );
      })
    );
  });

  editPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editPost),
      mergeMap((action) => {
        return this.postService
          .editPost(action.post)
          .pipe(map((data) => editPostSuccess({ post: action.post })));
      })
    );
  });

  deletePosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      mergeMap((action) => {
        return this.postService
          .deletePost(action.id)
          .pipe(map((data) => deletePostSuccess({ id:action.id })));
      })
    );
  });
}
