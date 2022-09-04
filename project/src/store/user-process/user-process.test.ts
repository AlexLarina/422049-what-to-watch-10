import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { saveUserAuthInfo, userProcess } from './user-process';

import { AuthStatus } from '../../const';
import { UserProcess } from '../../types/state';
import { makeFakeUser } from '../../test/mocks';

describe('Reducer: userProcess', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthStatus.Unknown,
      user: null,
    };
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" if checkAuthAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.fulfilled.type }))
        .toEqual({authorizationStatus: AuthStatus.Auth});
    });
    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.rejected.type }))
        .toEqual({...state, authorizationStatus: AuthStatus.NotAuth});
    });
  });

  // saveUserAuthInfo,
  it('should set given user data to user state field', () => {
    const user = makeFakeUser();

    expect(userProcess.reducer(state, saveUserAuthInfo(user)))
      .toEqual({...state, user: user});
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" if loginAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: loginAction.fulfilled.type }))
        .toEqual({authorizationStatus: AuthStatus.Auth});
    });
    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess.reducer(state, { type: loginAction.rejected.type }))
        .toEqual({...state, authorizationStatus: AuthStatus.NotAuth});
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: logoutAction.fulfilled.type }))
        .toEqual({...state, authorizationStatus: AuthStatus.NotAuth});
    });
  });
});
