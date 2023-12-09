import { InputProps } from '@/app/types/components/Input';
import style from './Input.module.scss';

export default function Input(props: InputProps) {
  return <input type='text' className={style.input} {...props} />;
}
