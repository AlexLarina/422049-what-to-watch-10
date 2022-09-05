export const BASE_URL = 'https://10.react.pages.academy/wtw';

export const SHOWN_FILM_LIMIT = 8;
export const SIMILAR_FILM_LIMIT = 4;
export const MAX_RATE = 10;
export const MAX_GENRE_SHOWN = 9;

export const MINTUES_IN_HOUR = 60;
export const SECONDS_IN_HOUR = 3600;

export const CONNECT_TIMEOUT = 5000;
export const PREVIEW_TIMEOUT = 1000;

export const FILM_MOCK_AMOUNT = 25;
export const LOADER_COLOR = '#d9cd8d';

export enum ReviewLength {
  Min = 50,
  Max = 400,
}

export enum AppRoute {
  Root = '/',
  Login = '/login',
  UserFilmList = '/mylist',
  Film = '/films/:id',
  NewReview = '/films/:id/review',
  Player = '/player/:id',
  NotFound = '/not_found'
}

export enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favourite = '/favorite',
}

export enum AuthStatus {
  Auth = 'AUTH',
  NotAuth = 'NOT_AUTH',
  Unknown = 'UNKNOWN '
}

export enum Genre {
  All = 'All genres',
}

export enum NameSpace {
  Film = 'FILM',
  User = 'USER',
}

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'November',
  'December',
];
