import { ReactNode } from 'react';

export type AcessControllProps = {
  children: ReactNode;
  IsregisteredUsersAllowed?: boolean;
  isAdminOnly?: boolean;
};
