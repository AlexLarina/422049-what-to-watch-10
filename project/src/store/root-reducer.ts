import { NameSpace } from '../const';
import { combineReducers } from '@reduxjs/toolkit';
import { filmProcess } from './film-process/film-process';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Film]: filmProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});

