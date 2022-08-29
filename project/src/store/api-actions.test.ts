import { requireAuth, saveUserAuthInfo } from './action';
import thunk, {ThunkDispatch} from 'redux-thunk';

import { APIRoute } from '../const';
import {Action} from 'redux';
import MockAdapter from 'axios-mock-adapter';
import { State } from '../types/state';
import api from '../services/api';
import { checkAuthAction } from './api-actions';
import {configureMockStore} from '@jedmao/redux-mock-store';

describe('Async actions', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);


  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      requireAuth.type,
      saveUserAuthInfo.type,
      checkAuthAction.fulfilled.type
    ]);
  });
});
