'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { ThemeProvider } from './features/dreams/HOCs/ThemeProvider/ThemeProvider';
import ApproveAction from './features/dreams/HOCs/ApproveAction/ApproveAction';

export default function Context({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SessionProvider>
        <ApproveAction>{children}</ApproveAction>
      </SessionProvider>
    </ThemeProvider>
  );
}
