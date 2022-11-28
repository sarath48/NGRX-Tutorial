import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './post.state';

const getPostState = createFeatureSelector<PostsState>('post');

export const getPosts = createSelector(getPostState, (state) => {
  return state.posts;
});

export const getPostById = createSelector(
  getPostState,
  (state: any, props: any) => {

    return state.posts.find(
      (data: { id: any }) => data.id.toString() === props.id
    );
  }
);
