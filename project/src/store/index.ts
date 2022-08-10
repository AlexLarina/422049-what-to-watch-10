import api from '../services/api';
import {configureStore} from '@reduxjs/toolkit';
import { redirect } from './middlewares/redirect';
import { reducer } from './reducer';

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }).concat(redirect),
});
