import React from 'react';
import useStylesProvider from '../../../hooks/useStylesProvider';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import style from './AudioPlayer.module.scss';

type AudioProps = { src: string };

export default function AudioPlayerComponent({ src }: AudioProps) {
  const styles = useStylesProvider();

  return (
    <div className={style.container}>
      <AudioPlayer
        src={src}
        showJumpControls={false}
        showFilledProgress={false}
        showFilledVolume={false}
        layout={'horizontal-reverse'}
        volume={0.7}
        loop={false}
        showDownloadProgress={false}
        className={style.container}
        style={styles.audio as React.CSSProperties}
      />
    </div>
  );
}
