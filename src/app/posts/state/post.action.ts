import { createAction, props } from '@ngrx/store';
import { Post } from './post.state';

const LOAD_POSTS = '[post page] load posts';
const LOAD_POSTS_SUCCESS = '[post page] load posts success';
const ADD_POST_SUCCESS = '[post page] add post success';
const EDIT_POST_SUCCESS = '[post page] edit post success';
const DELETE_POST_SUCCESS = '[post page] delete post success';

export const addPost = createAction('addPost', props<{ post: Post }>());

export const addPostSuccess = createAction(
  ADD_POST_SUCCESS,
  props<{ post: Post }>()
);

export const editPost = createAction('editPost', props<{ post: Post }>());

export const editPostSuccess = createAction(
  EDIT_POST_SUCCESS,
  props<{ post: Post }>()
);

export const deletePost = createAction(
  'deletePost',
  props<{ id: number | string }>()
);

export const deletePostSuccess = createAction(
  DELETE_POST_SUCCESS,
  props<{ id: string | number }>()
);

export const loadPosts = createAction(LOAD_POSTS);
export const loadPostsSuccess = createAction(
  LOAD_POSTS_SUCCESS,
  props<{ posts: Post[] }>()
);
