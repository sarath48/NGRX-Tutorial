import { createReducer, on } from '@ngrx/store';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  editPost,
  editPostSuccess,
  loadPostsSuccess,
} from './post.action';
import { initialState } from './post.state';

const _postReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    let post = { ...action.post };
    // post.id = state.posts.length + 1;
    return { ...state, posts: [...state.posts, post] };
  }),
  on(editPostSuccess, (state, action) => {
    const updatedPost = state.posts.map((post) => {
      return action.post.id === post.id ? action.post : post;
    });
    return { ...state, posts: updatedPost };
  }),
  on(deletePostSuccess, (state, action) => {
    const updatePost = state.posts.filter((post) => {
      return action.id !== post.id;
    });
    return { ...state, posts: updatePost };
  }),
  on(loadPostsSuccess, (state, action) => {
    return { ...state, posts: action.posts };
  })
);

export function postReducer(state: any, action: any) {
  return _postReducer(state, action);
}
