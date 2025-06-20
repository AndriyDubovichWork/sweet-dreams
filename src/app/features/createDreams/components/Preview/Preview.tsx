import AudioPlayerComponent from '@/app/common/components/ui/AudioPlayer/AudioPlayer';
import { useNewDreamStore } from '../../store/useNewDreamStore';
import createFullName from '../../utils/createFullName';

export default function Preview() {
  const { blob, date, name, isPrivate } = useNewDreamStore();
  return (
    <>
      {(name || blob) && <h1>preview:</h1>}
      {name && <h3>name: {createFullName(name, date)}</h3>}
      {blob && <AudioPlayerComponent src={URL.createObjectURL(blob as Blob)} />}
    </>
  );
}
