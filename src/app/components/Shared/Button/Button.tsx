import React, { ButtonHTMLAttributes } from 'react';
import style from './Button.module.scss';
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {};

export default function Button({ ...props }: ButtonProps) {
  return (
    <button className={style.button} {...props}>
      {props.children}
    </button>
  );
}
