'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';
import ApproveAction from './HOCs/ApproveAction/ApproveAction';
import { ThemeProvider } from './HOCs/ThemeProvider/ThemeProvider';

export default function Context({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SessionProvider>
        <ApproveAction>{children}</ApproveAction>
      </SessionProvider>
    </ThemeProvider>
  );
}
