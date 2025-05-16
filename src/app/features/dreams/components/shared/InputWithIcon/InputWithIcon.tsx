import { InputProps } from '@/app/features/dreams/types/components/shared/Input';
import style from './InputWithIcon.module.scss';

export default function InputWithIcon({ children, ...props }: InputProps) {
  return (
    <div className={style.container}>
      <input type='text' className={style.input} {...props} />
      <div className={style.icon}>{children}</div>
    </div>
  );
}
