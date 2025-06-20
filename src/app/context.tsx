'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { ThemeProvider } from './common/hocs/ThemeProvider/ThemeProvider';
import ApproveAction from './common/hocs/ApproveAction/ApproveAction';

export default function Context({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SessionProvider>
        <ApproveAction>{children}</ApproveAction>
      </SessionProvider>
    </ThemeProvider>
  );
}
