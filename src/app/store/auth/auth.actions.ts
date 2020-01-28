import { AuthStatus } from './auth.state';

import { IUser } from '../../models/user.model';
import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] login',
  REGISTER = '[Auth] register',
  LOGOUT = '[Auth] logout',
  SET_AUTH_STATUS = '[Auth] set auth status',
  LOGIN_WITH_GOOGLE = '[Auth] login with google',
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: { email: string; password: string }) {}
}

export class Register implements Action {
  readonly type = AuthActionTypes.REGISTER;
  constructor(public payload: { email: string; password: string }) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class LoginWithGoogle implements Action {
  readonly type = AuthActionTypes.LOGIN_WITH_GOOGLE;
}

export class SetAuthStatus implements Action {
  readonly type = AuthActionTypes.SET_AUTH_STATUS;
  constructor(public payload: { status: AuthStatus; user?: IUser }) {}
}

export type AuthActions = Register | Login | Logout | SetAuthStatus;
