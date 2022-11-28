import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../posts/state/post.state';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  getPost() {
    return this.http
      .get(
        `https://ngrx-tutorials-4b21d-default-rtdb.firebaseio.com/posts.json`
      )
      .pipe(
        map((data: any) => {
          const posts: Post[] = [];

          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }

          return posts;
        })
      );
  }

  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `https://ngrx-tutorials-4b21d-default-rtdb.firebaseio.com/posts.json`,
      post
    );
  }

  editPost(post: Post) {
    const postData = {
      [post.id as string]: { title: post.title, description: post.description },
    };
    return this.http.patch(
      `https://ngrx-tutorials-4b21d-default-rtdb.firebaseio.com/posts.json`,
      postData
    );
  }

  deletePost(id: string | number) {
    return this.http.delete(
      `https://ngrx-tutorials-4b21d-default-rtdb.firebaseio.com/posts.json?id=${id}`
    );
  }
}
