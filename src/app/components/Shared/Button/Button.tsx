import React, { ButtonHTMLAttributes } from 'react';
import style from './Button.module.scss';
import { ButtonProps } from '@/app/types/components/Shared/Button';

export default function Button({ ...props }: ButtonProps) {
  return (
    <button className={style.button} {...props}>
      {props.children}
    </button>
  );
}
