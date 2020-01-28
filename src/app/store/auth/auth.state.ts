import { IUser } from '../../models/user.model';
export interface IAuthState {
  authStatus: AuthStatus;
  authUser: IUser;
}

export const initialAuthState: IAuthState = {
  authStatus: 'not-authenticated',
  authUser: null,
};

export type AuthStatus =
  | 'authenticating'
  | 'authenticated'
  | 'not-authenticated'
  | 'authenticate-error';
