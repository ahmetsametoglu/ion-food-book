import { AuthService } from './../../services/auth.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes, Login, SetAuthStatus, Logout } from './auth.actions';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class AuthEffects {
  @Effect() register$: Observable<Action> = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.REGISTER),
    map(action => action.payload),
    switchMap(({ email, password }) => {
      return this.authService.registerWithMail(email, password);
    }),
    switchMap(result => {
      console.log('registerWithMail:', result);
      const user = this.userService.getUserFromFirebaseModel(result.user);
      return of(
        new SetAuthStatus({ status: !!user ? 'authenticated' : 'not-authenticated', user: user })
      );
    })
  );

  @Effect() login$: Observable<Action> = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LOGIN),
    map(action => action.payload),
    switchMap(({ email, password }) => {
      return this.authService.loginWithMail(email, password);
    }),
    switchMap(result => {
      console.log('loginWithMail:', result);
      const user = this.userService.getUserFromFirebaseModel(result.user);
      return of(
        new SetAuthStatus({ status: !!user ? 'authenticated' : 'not-authenticated', user: user })
      );
    })
  );

  @Effect() loginWithGoogle$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LOGIN_WITH_GOOGLE),
    switchMap(() => {
      return this.authService.loginWithGoogle();
    }),
    switchMap(result => {
      console.log('loginWithGoogle:', result);
      const user = this.userService.getUserFromFirebaseModel(result.user);
      return of(
        new SetAuthStatus({ status: !!user ? 'authenticated' : 'not-authenticated', user: user })
      );
    })
  );

  @Effect() logout$: Observable<Action> = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LOGOUT),
    switchMap(() => {
      return this.authService.logout();
    }),
    switchMap(_ => {
      return of(new SetAuthStatus({ status: 'not-authenticated' }));
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService
  ) {}
}
