import Film from './film';

export interface FilmState {
    filmID: number;
}

export interface ReviewState {
    film: Film;
}
