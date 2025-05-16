import Spinner from './features/dreams/components/shared/Spinner/Spinner';
import Centered from './features/dreams/HOCs/Centered/Centered';

export default function Loading() {
  return (
    <Centered content>
      <Spinner />
    </Centered>
  );
}
