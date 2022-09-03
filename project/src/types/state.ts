import { AuthStatus } from '../const';
import Film from './film';
import { UserData } from './user-data';
import {store} from '../store/index';

export type UserProcess = {
  authorizationStatus: AuthStatus,
  user: UserData | null;
};

export type FilmProcess = {
  genre: string;
  filmList: Film[];
  favouriteFilmList: Film[];
  promo: Film | null;
  isLoadingCompleted: {promo: boolean, films: boolean, favourite: boolean};
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

