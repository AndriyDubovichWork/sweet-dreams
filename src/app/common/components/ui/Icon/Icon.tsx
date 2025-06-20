import React from 'react';
import style from './Icon.module.scss';
import { IconProps } from '@/app/common/components/types/Icon';

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
