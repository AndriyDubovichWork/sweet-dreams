'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';
import ApproveAction from './HOCs/Shared/ApproveAction/ApproveAction';

export default function Context({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ApproveAction>{children}</ApproveAction>
    </SessionProvider>
  );
}
