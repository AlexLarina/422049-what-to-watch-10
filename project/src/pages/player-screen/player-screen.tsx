import { CSSProperties, useRef, useState } from 'react';

import { LOADER_COLOR } from '../../const';
import RingLoader from 'react-spinners/RingLoader';
import browserHistory from '../../services/browser-history';
import formateTime from '../../services/time';
import { useLocation } from 'react-router-dom';

interface PlayerState {
  filmRef: string;
  poster: string;
}

const override: CSSProperties = {
  display: 'block',
  borderColor: 'red',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

function PlayerScreen(): JSX.Element {
  const {filmRef, poster} = useLocation().state as PlayerState;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

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
      <RingLoader color={LOADER_COLOR} loading={isLoading} size={75} cssOverride={override} />

      <video
        src={filmRef}
        ref={videoRef}
        className="player__video"
        poster={poster}
        autoPlay={false}
        onLoadedMetadata={(e: React.SyntheticEvent<HTMLVideoElement>) => {
          setDuration(e.currentTarget.duration);
        }}
        onTimeUpdate={(e: React.SyntheticEvent<HTMLVideoElement>) => {
          setCurrentTime(e.currentTarget.currentTime);
        }}
        onLoadStart={() => {
          setIsLoading(true);
        }}
        onLoadedData={() => {
          setIsLoading(false);
        }}
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
            <progress
              className="player__progress"
              value={Math.round(currentTime * 100 / duration) || 0}
              max="100"
            >
            </progress>
            <div
              className="player__toggler"
              style={{left: `${currentTime * 100 / duration }%`}}
            >Toggler
            </div>
          </div>
          <div className="player__time-value">
            {formateTime(duration - currentTime)}
          </div>
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
