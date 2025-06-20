import { InputProps } from '@/app/common/components/types/Input';
import style from './Input.module.scss';
import useStylesProvider from '@/app/common/hooks/useStylesProvider';

export default function Input({ type = 'text', ...props }: InputProps) {
  const styles = useStylesProvider();

  return (
    <input
      type={type}
      className={style.input}
      style={type === 'date' ? styles.calendar : styles.input}
      {...props}
    />
  );
}
