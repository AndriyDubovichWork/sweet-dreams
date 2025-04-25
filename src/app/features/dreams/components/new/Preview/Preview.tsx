import { useNewDreamStore } from '../../../store/new/useNewDreamStore';
import createFullName from '../../../utils/new/createFullName';

export default function Preview() {
  const { blob, date, name, isPrivate } = useNewDreamStore();
  return (
    <>
      <h1>preview:</h1>
      {name && <h3>name: {createFullName(name, date, isPrivate)}</h3>}
      {blob && <audio controls src={URL.createObjectURL(blob as Blob)} />}
    </>
  );
}
