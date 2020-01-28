import { IAuthState, initialAuthState } from './auth.state';
import { AuthActions, AuthActionTypes } from './auth.actions';

export const authReducer = (state = initialAuthState, action: AuthActions): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH_STATUS:
      const { user, status } = action.payload;
      return { ...state, authUser: user, authStatus: !!user ? status : 'not-authenticated' };

    default:
      return state;
  }
};
