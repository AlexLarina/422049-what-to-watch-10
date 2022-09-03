import { AuthStatus } from '../const';
import Film from './film';
import { UserData } from './user-data';
import {store} from '../store/index';

export type InitialState = {
  genre: string;
  user: UserData | null;
}

export type UserProcess = {
  authorizationStatus: AuthStatus
};

export type DataProcess = {
  fullFilmList: Film[];
  filmList: Film[];
  favouriteFilmList: Film[];
  promo: Film | null;
  isLoadingCompleted: {promo: boolean, films: boolean, favourite: boolean};
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

