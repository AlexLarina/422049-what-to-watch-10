import {
  APIRoute,
  FILM_MOCK_AMOUNT
} from '../const';
import {
  checkAuthAction,
  fetchFavouriteAction,
  fetchFilmsAction,
  fetchPromoAction,
  loginAction,
  logoutAction
} from './api-actions';
import thunk, {ThunkDispatch} from 'redux-thunk';

import {Action} from 'redux';
import { AuthData } from '../types/auth-data';
import MockAdapter from 'axios-mock-adapter';
import { State } from '../types/state';
import api from '../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeFilm } from '../test/mocks';

describe('Async actions', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  // checkAuthAction
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
      fetchFavouriteAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  // loginAction
  it('should save user data and fetch favourite when POST /login', async () => {
    const fakeUser: AuthData = {email: 'test@test.ru', password: '123456'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'user-token'});


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      fetchFavouriteAction.pending.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('wtw-token', 'user-token');
  });

  // logoutAction
  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('wtw-token');
  });

  // fetchFilmsAction
  it('should dispatch loadFilms when GET /films', async () => {
    const mockFilms = new Array(FILM_MOCK_AMOUNT).fill(makeFakeFilm());
    mockAPI
      .onGet(APIRoute.Films)
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchFilmsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmsAction.pending.type,
      fetchFilmsAction.fulfilled.type
    ]);
  });

  // fetchPromoAction
  it('should dispatch loadPromo when GET /promo', async () => {
    const mockPromo = makeFakeFilm();
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, mockPromo);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });

  // fetchFavouriteAction
  it('should dispatch loadFavourite when GET /favorite', async () => {
    const mockFavourite = new Array(FILM_MOCK_AMOUNT)
      .fill(makeFakeFilm())
      .filter((film) => film.isFavourite);
    mockAPI
      .onGet(APIRoute.Favourite)
      .reply(200, mockFavourite);

    const store = mockStore();

    await store.dispatch(fetchFavouriteAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavouriteAction.pending.type,
      fetchFavouriteAction.fulfilled.type
    ]);
  });
});
