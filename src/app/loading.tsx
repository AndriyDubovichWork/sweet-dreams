import Centered from './features/dreams/HOCs/Shared/Centered/Centered';
import Spinner from './features/dreams/components/Shared/Spinner/Spinner';

export default function Loading() {
  return (
    <Centered content>
      <Spinner />
    </Centered>
  );
}
