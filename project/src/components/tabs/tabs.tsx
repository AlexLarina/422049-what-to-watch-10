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
    'Reviews': <Reviews film={film} />
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {Object.keys(TabNames).map((tabName) => (
            <li
              className={activeTab === tabName ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}
              key={tabName}
            >
              <a
                href='#'
                className="film-nav__link"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(tabName);
                }}
              >
                {tabName}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {TabNames[activeTab]}
    </div>
  );
}

export default Tabs;
