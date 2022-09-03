import { AuthStatus, NameSpace } from '../../const';

import { UserProcess } from '../../types/state';
import { checkAuthAction } from '../api-actions';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UserProcess = {
  authorizationStatus: AuthStatus.Unknown,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthStatus.NotAuth;
      });
  },
});
