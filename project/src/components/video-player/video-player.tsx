import { useEffect, useRef } from 'react';

type VideoPlayerProps = {
  posterSrc: string;
  src: string;
  startPlaying: boolean;
}

function VideoPlayer({posterSrc, src, startPlaying}: VideoPlayerProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (startPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  }, [startPlaying]);

  return (
    <video
      src={src}
      ref={videoRef}
      poster={posterSrc}
      width="280"
      height="174"
    >
    </video>
  );
}

export default VideoPlayer;
