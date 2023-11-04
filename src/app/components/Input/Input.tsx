import React, { InputHTMLAttributes } from 'react';
import style from './Input.module.scss';
type InputProps = InputHTMLAttributes<HTMLInputElement> & {};

export default function Input(props: InputProps) {
  return <input type='text' className={style.input} {...props} />;
}
