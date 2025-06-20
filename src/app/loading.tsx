import Spinner from './common/components/ui/Spinner/Spinner';
import Centered from './common/hocs/Centered/Centered';

export default function Loading() {
  return (
    <Centered content>
      <Spinner />
    </Centered>
  );
}
