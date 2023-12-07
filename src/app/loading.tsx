import Centered from './HOCs/Shared/Centered/Centered';
import Spinner from './components/Shared/Spinner/Spinner';

export default function Loading() {
  return (
    <Centered content>
      <Spinner />
    </Centered>
  );
}
