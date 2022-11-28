import { AuthReducer } from '../auth/auth/auth.reducer';
import { AuthState } from '../auth/auth/auth.state';
import { sharedReducer } from './shared/shared.reducer';
import { SHARED_STATE_NAME } from './shared/shared.selector';
import { SharedState } from './shared/shared.state';

export interface appState {
  [SHARED_STATE_NAME]: SharedState;
  auth: AuthState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: sharedReducer,
  auth: AuthReducer,
};
