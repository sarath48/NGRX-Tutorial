import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogin } from './auth/auth/auth.action';
import { appState } from './store/app.state';
import { getErrorMessage, getLoading } from './store/shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ngrx-tutorial';
  showLoading!: Observable<boolean>;
  showErrorMessage!: Observable<string>;
  constructor(private store: Store<appState>) {}

  ngOnInit() {
    this.showLoading = this.store.select(getLoading);
    this.showErrorMessage = this.store.select(getErrorMessage);
    this.store.dispatch(autoLogin());
  }
}
