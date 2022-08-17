import { useRef, useState } from 'react';

import browserHistory from '../../services/browser-history';
import { useLocation } from 'react-router-dom';

interface PlayerState {
  filmRef: string;
  poster: string;
}

function PlayerScreen(): JSX.Element {
  const {filmRef, poster} = useLocation().state as PlayerState;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onPlayerClick = () => {
    if (videoRef.current === null) {
      return;
    }

    if(!isPlaying) {
      setIsPlaying(true);
      videoRef.current.play();
      return;
    }

    setIsPlaying(false);
    videoRef.current.pause();
  };

  const onExitClick = () => {
    browserHistory.back();
  };

  const onFullScreenClick = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) { elem.requestFullscreen(); }
  };

  return (
    <div className="player">
      <video
        src={filmRef}
        ref={videoRef}
        className="player__video"
        poster={poster}
        autoPlay={false}
      >
      </video>

      <button
        type="button"
        className="player__exit"
        onClick={onExitClick}
      >Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={onPlayerClick}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              {
                isPlaying
                  ? <use xlinkHref="#pause"></use>
                  : <use xlinkHref="#play-s"></use>
              }
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={onFullScreenClick}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerScreen;
