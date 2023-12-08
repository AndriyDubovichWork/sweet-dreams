import { IconProps } from '@/app/types/components/Shared/Icon';
import React from 'react';
import style from './Icon.module.scss';

export default function Icon({
  children,
  size = 30,
  clickable = true,
}: IconProps) {
  return (
    <div className={`${clickable && style.clickable}`}>
      {React.cloneElement(children as React.ReactElement, {
        size,
      })}
    </div>
  );
}
