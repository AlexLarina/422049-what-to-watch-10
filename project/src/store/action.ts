import Film from '../types/film';
import { createAction } from '@reduxjs/toolkit';

export const chooseGenre = createAction<{genre: string}>('genre/chooseGenre');

export const getFilms = createAction('genre/getFilms');

export const loadFilms = createAction<Film[]>('data/loadFilms');

export const setLoadingStatus = createAction<boolean>('data/loadingStatus');
