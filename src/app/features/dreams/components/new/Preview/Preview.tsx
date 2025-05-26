import { useNewDreamStore } from '../../../store/new/useNewDreamStore';
import createFullName from '../../../utils/new/createFullName';
import Audio from '../../shared/Audio/Audio';

export default function Preview() {
  const { blob, date, name, isPrivate } = useNewDreamStore();
  return (
    <>
      {(name || blob) && <h1>preview:</h1>}
      {name && <h3>name: {createFullName(name, date, isPrivate)}</h3>}
      {blob && <Audio src={ URL.createObjectURL(blob as Blob)} />}
    </>
  );
}
