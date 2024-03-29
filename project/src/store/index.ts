import api from '../services/api';
import {configureStore} from '@reduxjs/toolkit';
import { redirect } from './middlewares/redirect';
import { rootReducer } from './root-reducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }).concat(redirect),
});
