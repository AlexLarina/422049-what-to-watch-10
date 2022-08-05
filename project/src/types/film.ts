type Film = {
    id: number;
    title: string;
    posterSrc: string;
    genre: string;
    year: number;
    bigPosterSrc: string;
    isFavorite?: boolean;
};

export default Film;
