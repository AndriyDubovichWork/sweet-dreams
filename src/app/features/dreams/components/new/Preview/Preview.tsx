import { useNewDreamStore } from '../../../store/new/useNewDreamStore';
import createFullName from '../../../utils/new/createFullName';

export default function Preview() {
  const { blob, date, name } = useNewDreamStore();
  return (
    <>
      <h1>preview:</h1>
      <h3>name: {createFullName(name, date)}</h3>
      {blob ? (
        <audio controls src={URL.createObjectURL(blob as Blob)} />
      ) : (
        <h3>no audio file</h3>
      )}
    </>
  );
}
