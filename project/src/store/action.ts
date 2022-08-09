import { AppRoute, AuthStatus } from '../const';

import Film from '../types/film';
import { UserData } from '../types/user-data';
import { createAction } from '@reduxjs/toolkit';

export const chooseGenre = createAction<{genre: string}>('genre/chooseGenre');

export const getFilms = createAction('genre/getFilms');

export const loadFilms = createAction<Film[]>('data/loadFilms');

export const loadPromo = createAction<Film>('data/loadPromo');

export const setLoadingPromoStatus = createAction<{promo: boolean}>('data/loadingPromoStatus');

export const setLoadingFilmsStatus = createAction<{films: boolean}>('data/loadingFilmsStatus');

export const getFavourites = createAction('data/getFavourites');

export const requireAuth = createAction<AuthStatus>('user/requireAuth');

export const saveUserAuthInfo = createAction<UserData>('user/saveAuthInfo');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');

