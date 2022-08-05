type Film = {
    previewVideoLink: string;
    id: number;
    title: string;
    posterSrc: string;
    genre: string;
    year: number;
    bigPosterSrc: string;
    backgroundColor: string;
    rating: number;
    scoresCount: number;
    director: string;
    description: string;
    starring: [string];
    runTime: number;
    isFavorite?: boolean;
};

export default Film;
