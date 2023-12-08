'use client';

import Centered from './features/dreams/HOCs/Shared/Centered/Centered';
import Button from './features/dreams/components/Shared/Button/Button';

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
