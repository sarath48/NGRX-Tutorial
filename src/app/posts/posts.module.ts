import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AddPostsComponent } from './add-posts/add-posts.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { postReducer } from './state/post.reducer';
import { PostEffects } from './state/posts.effects';

const route: Routes = [
  {
    path: '',
    component: PostsListComponent,
    children: [
      // { path: '', component: PostsListComponent },
      { path: 'add', component: AddPostsComponent },
      { path: 'edit/:id', component: EditPostComponent },
    ],
  },
];

@NgModule({
  declarations: [PostsListComponent, AddPostsComponent, EditPostComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(route),
    StoreModule.forFeature('post', postReducer),
    EffectsModule.forFeature([PostEffects]),
  ],
  providers: [],
  bootstrap: [],
})
export class PostsModule {}
