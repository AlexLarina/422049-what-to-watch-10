import { APIRoute, AppRoute } from '../../const';
import { useEffect, useState } from 'react';

import Film from '../../types/film';
import FilmControls from '../../components/film-controls/film-controls';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SimilarFilmList from '../../components/similar-film-list/similar-film-list';
import { StatusCodes } from 'http-status-codes';
import Tabs from '../../components/tabs/tabs';
import api from '../../services/api';
import { filmFromApi } from '../../services/adapters/film';
import { redirectToRoute } from '../../store/action';
import { useAppDispatch } from '../../hooks';
import { useParams } from 'react-router-dom';

function MovieScreen(): JSX.Element {
  const { id } = useParams();
  const [film, setFilmData] = useState({} as Film);
  const [isLoadingCompleted, setLoadingCompleted] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await api.get(`${APIRoute.Films}/${id}`).then(
        ({data}) => {
          setLoadingCompleted(!isLoadingCompleted);
          setFilmData(filmFromApi(data));
        },
        (error) => {
          if (error.response.status === StatusCodes.NOT_FOUND) {
            dispatch(redirectToRoute(AppRoute.NotFound));
          }
        });
    };

    fetchData();
  }, []);

  if (!isLoadingCompleted) {
    return <p>Data loading...</p>;
  }

  return (
    <>
      <section className="film-card film-card--full" style={{ backgroundColor: film.backgroundColor }}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.bigPosterSrc} alt={film.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header headerClass='film-card__head'/>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.year}</span>
              </p>

              <FilmControls film={film}/>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={film.posterSrc}
                alt={`${film.title} poster`}
                width="218"
                height="327"
              />
            </div>

            <Tabs film={film}/>
          </div>
        </div>
      </section>
      <div className="page-content">
        <SimilarFilmList filmID={Number(id)}/>
        <Footer />
      </div>
    </>
  );
}

export default MovieScreen;
