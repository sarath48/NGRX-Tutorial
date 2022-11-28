export interface Post {
  id?: number | string;
  title: string;
  description: string;
}

export interface PostsState {
  posts: Post[];
}

export const initialState: PostsState = {
  posts: [],
};
