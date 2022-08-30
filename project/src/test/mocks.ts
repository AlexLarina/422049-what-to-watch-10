import {
  date,
  image,
  internet,
  lorem,
  music,
  name,
  random
} from 'faker';

import Film from '../types/film';
import { UserData } from '../types/user-data';

enum ID {
  MIN = 1,
  MAX = 25,
}

enum Rate {
  MIN = 1,
  MAX = 100,
}

enum RunTime {
  MIN = 90,
  MAX = 180,
}

enum Release {
  EARLY = '1940',
  LATE = '2021',
}

const createFakeName = () => `${name.lastName()} ${name.lastName()}`;

export const makeFakeFilm = (): Film => ({
  previewVideoLink: image.imageUrl(),
  videoLink: image.imageUrl(),
  id: Math.round(Math.random() * (ID.MAX - ID.MIN)),
  title: name.title(),
  posterSrc: image.imageUrl(),
  genre: music.genre(),
  year: date.between(Release.EARLY, Release.LATE).getFullYear(),
  bigPosterSrc: image.imageUrl(),
  backgroundColor: '#ffffff',
  rating: Math.round(Math.random() * (Rate.MAX - Rate.MIN)),
  scoresCount: Math.round(Math.random() * (Rate.MAX - Rate.MIN)),
  director: createFakeName(),
  description: lorem.paragraph(),
  starring: new Array(3).fill(createFakeName()),
  runTime: Math.round(Math.random() * (RunTime.MAX - RunTime.MIN)),
  isFavorite: Math.random() < 0.5,
} as Film);

export const makeFakeUser = (): UserData => ({
  email: internet.email(),
  token: random.alphaNumeric(10),
  avatarUrl: image.imageUrl(),
} as UserData);
