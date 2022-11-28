import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../auth/auth-response-data.model';
import { User } from '../auth/user.model';
import { appState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { autoLogout } from '../auth/auth/auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeOutInterval!: any;

  constructor(private http: HttpClient, private store: Store<appState>) {}

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}
    `,
      { email, password, returnSecureToken: true }
    );
  }

  setDataInLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.runTimeOutInterval(user);
  }

  getUserFromLocalStorage() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const userInfo = JSON.parse(userData);
      const expirationDate = new Date(userInfo.expirationDate);
      const user = new User(
        userInfo.email,
        userInfo.token,
        userInfo.localId,
        expirationDate
      );
      this.runTimeOutInterval(user);
      return user;
    }
    return null;
  }

  runTimeOutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;
    this.timeOutInterval = setTimeout(() => {
      //logout functionality
      this.store.dispatch(autoLogout());
    }, timeInterval);
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user = new User(
      data.email,
      data.idToken,
      data.localId,
      expirationDate
    );

    return user;
  }

  formatErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email not found please check and enter correct email';
      case 'INVALID_PASSWORD':
        return 'Wrong password please enter the correct password';
      case 'EMAIL_EXISTS':
        return 'The email address is already in use by another account';
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return 'We have blocked all requests from this device due to unusual activity. Try again later';

      default:
        return 'Unknown error occured. Please try again!';
    }
  }

  logout() {
    localStorage.removeItem('user');
    if (this.timeOutInterval) {
      clearTimeout(this.timeOutInterval);
    }
  }
}
