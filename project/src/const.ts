export enum AppRoute {
    Root = '/',
    Login = '/login',
    UserFilmList = '/mylist',
    Film = '/films/:id',
    NewReview = '/films/:id/review',
    Player = '/player/:id',
}

export enum AuthStatus {
    Auth = 'AUTH',
    NotAuth = 'NOT_AUTH',
    Unknown = 'UNKNOWN '
}
