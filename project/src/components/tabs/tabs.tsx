import Details from '../details/details';
import Film from '../../types/film';
import Overview from '../overview/overview';
import Reviews from '../review-list/review-list';
import { useState } from 'react';

type TabsProps = {
  film: Film
};

function Tabs({film}: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState('Overview');

  const TabNames: { [propertyName: string] : JSX.Element } = {
    'Overview': <Overview film={film}/>,
    'Details': <Details film={film} />,
    'Reviews': <Reviews filmID={film.id} />
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav" data-testid="film-nav">
        <ul className="film-nav__list">
          {Object.keys(TabNames).map((tabName) => (
            <li
              className={
                activeTab === tabName
                  ? 'film-nav__item film-nav__item--active'
                  : 'film-nav__item'
              }
              key={tabName}
            >
              <span
                style={{cursor: 'pointer'}}
                className="film-nav__link"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(tabName);
                }}
              >
                {tabName}
              </span>
            </li>
          ))}
        </ul>
      </nav>
      {TabNames[activeTab]}
    </div>
  );
}

export default Tabs;
