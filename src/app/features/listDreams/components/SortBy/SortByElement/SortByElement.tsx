import React from 'react';
import style from './SortByElement.module.scss';
import useStylesProvider from '@/app/common/hooks/useStylesProvider';
import { SortByElementProps } from '../../types/SortByElement';

export default function SortByElement({
  disabled,
  onClick,
  children,
}: SortByElementProps) {
  const styles = useStylesProvider();
  return (
    <div
      onClick={onClick}
      className={style.sortByElement}
      style={
        disabled ? styles.sortByElement.disabled : styles.sortByElement.enabled
      }
    >
      {children}
    </div>
  );
}
