import React from 'react';
import style from './SortByElement.module.scss';
import { SortByElementProps } from '../../../types/components/list/SortByElement';
import useStylesProvider from '../../../hooks/useStylesProvider';

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
