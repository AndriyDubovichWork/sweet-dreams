import React, { FC, InputHTMLAttributes } from 'react';
import style from './Input.module.scss';
import { InputProps } from '@/app/types/components/Shared/Input';

export default function Input(props: InputProps) {
  return <input type='text' className={style.input} {...props} />;
}
