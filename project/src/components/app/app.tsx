import Film from '../../types/film';

import MainScreen from '../../pages/main-screen/main-screen';

type AppScreenProps = {
  filmData: Film[];
  promoFilm: Film;
}

function App({filmData, promoFilm}: AppScreenProps): JSX.Element {
  return (
    <MainScreen
      filmData={filmData}
      promoFilm={promoFilm}
    />
  );
}

export default App;
