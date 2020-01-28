import { MergedRouteReducerState } from './router/merged-route';
import { IAuthState, initialAuthState } from './auth/auth.state';

export interface IAppState {
  router?: MergedRouteReducerState;
  auth: IAuthState;
}

const initialAppState = {
  auth: initialAuthState,
};

export const getInitialState = (): IAppState => {
  return initialAppState;
};
