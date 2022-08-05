import Film from './film';
import {store} from '../store/index';

export type InitialState = {
  genre: string;
  fullFilmList: Film[];
  filmList: Film[];
  favouriteFilmList: Film[];
  promo: Film | null;
  isLoadingCompleted: boolean;
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

