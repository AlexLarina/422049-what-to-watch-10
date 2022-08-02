import { createAction } from '@reduxjs/toolkit';

export const chooseGenre = createAction<{genre: string}>('genre/chooseGenre');

export const getFilms = createAction('genre/getFilms');
