'use client';

import Centered from './HOCs/Centered/Centered';
import Button from './components/Button/Button';

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
