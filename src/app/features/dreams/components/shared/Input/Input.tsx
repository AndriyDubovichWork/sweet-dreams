import { InputProps } from '@/app/features/dreams/types/components/shared/Input';
import style from './Input.module.scss';
import useStylesProvider from '../../../hooks/useStylesProvider';

export default function Input(props: InputProps) {
  const styles = useStylesProvider();

  return (
    <input
      type='text'
      className={style.input}
      style={styles.input}
      {...props}
    />
  );
}
