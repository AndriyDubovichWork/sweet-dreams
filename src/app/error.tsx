'use client';

import Button from './common/components/ui/Button/Button';
import Centered from './common/hocs/Centered/Centered';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Centered content>
      <h1>{error.message}</h1>
      <Button onClick={reset}>try again</Button>
    </Centered>
  );
}
