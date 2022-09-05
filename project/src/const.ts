export const BASE_URL = 'https://10.react.pages.academy/wtw';
export const LOADER_COLOR = '#d9cd8d';

export enum AppLimit {
  FilmShown = 8,
  SimilarFilmShown = 4,
  MaxRate = 10,
  GenreShown = 9,
  FilmMocked = 25,
}

export enum Timeout {
  Connect = 5000,
  Preview = 1000,
}

export enum Hour {
  Minutes = 60,
  Seconds = 3600,
}

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
