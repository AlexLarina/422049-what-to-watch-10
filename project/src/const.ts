export enum AppRoute {
  Root = '/',
  Login = '/login',
  UserFilmList = '/mylist',
  Film = '/films/:id',
  NewReview = '/films/:id/review',
  Player = '/player/:id',
}

export enum APIRoute {
  Films = '/films',
  Promo = '/promo',
}

export enum AuthStatus {
  Auth = 'AUTH',
  NotAuth = 'NOT_AUTH',
  Unknown = 'UNKNOWN '
}

export enum Genre {
  All = 'All genres',
}

export const SHOWN_FILM_LIMIT = 8;
export const MAX_RATE = 10;
export const PREVIEW_TIMEOUT = 1000;

export const MOVIE_REF = 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm';
export const BASE_URL = 'https://10.react.pages.academy/wtw';
export const CONNECT_TIMEOUT = 5000;
