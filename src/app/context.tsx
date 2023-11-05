'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import ApproveAction from './components/Forms/ApproveAction/ApproveAction';

export default function Context({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ApproveAction>{children}</ApproveAction>
    </SessionProvider>
  );
}
