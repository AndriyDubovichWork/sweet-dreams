import React from 'react';
import style from './Spinner.module.scss';
import { AiOutlineLoading } from 'react-icons/ai';
import { IconBaseProps } from 'react-icons';

export default function Spinner({ className, ...props }: IconBaseProps) {
  return (
    <AiOutlineLoading className={`${style.loading} ${className}`} {...props} />
  );
}
