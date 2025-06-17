import { useNewDreamStore } from '../../../store/new/useNewDreamStore';
import createFullName from '../../../utils/new/createFullName';
import AudioPlayer from '../../shared/AudioPlayer/AudioPlayer';

export default function Preview() {
  const { blob, date, name, isPrivate } = useNewDreamStore();
  return (
    <>
      {(name || blob) && <h1>preview:</h1>}
      {name && <h3>name: {createFullName(name, date)}</h3>}
      {blob && <AudioPlayer src={URL.createObjectURL(blob as Blob)} />}
    </>
  );
}
