import { CSSProperties, ReactNode } from 'react';
export type centeredProps = {
  children: ReactNode;
  className?: string;
  styles?: CSSProperties;
  absolute?: boolean;
  vertically?: boolean;
  horizontally?: boolean;
  content?: boolean;
};
