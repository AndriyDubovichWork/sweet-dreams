'use client';

import Button from './common/components/ui/Button/Button';
import Centered from './common/hocs/Centered/Centered';
import useStylesProvider from './common/hooks/useStylesProvider';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { errorPage } = useStylesProvider();

  return (
    <Centered absolute={false} content styles={errorPage}>
      <h1>{error.message}</h1>
      <Button onClick={reset}>try again</Button>
    </Centered>
  );
}
