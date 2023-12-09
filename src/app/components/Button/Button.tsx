import { ButtonProps } from '@/app/types/components/Button';
import style from './Button.module.scss';

export default function Button({ ...props }: ButtonProps) {
  return (
    <button className={style.button} {...props}>
      {props.children}
    </button>
  );
}
