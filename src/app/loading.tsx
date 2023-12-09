import Centered from './HOCs/Centered/Centered';
import Spinner from './components/Spinner/Spinner';

export default function Loading() {
  return (
    <Centered content>
      <Spinner />
    </Centered>
  );
}
