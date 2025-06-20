import { InputProps } from '@/app/common/components/types/Input';
import style from './InputWithIcon.module.scss';
import useStylesProvider from '@/app/common/hooks/useStylesProvider';

export default function InputWithIcon({ children, ...props }: InputProps) {
  const styles = useStylesProvider();

  return (
    <div className={style.container}>
      <input
        type='text'
        className={style.input}
        style={styles.input}
        {...props}
      />
      <div className={style.icon}>{children}</div>
    </div>
  );
}
