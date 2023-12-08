import { IconBaseProps } from 'react-icons';
import { AiOutlineLoading } from 'react-icons/ai';
import style from './Spinner.module.scss';

export default function Spinner({ className, ...props }: IconBaseProps) {
  return (
    <AiOutlineLoading className={`${style.loading} ${className}`} {...props} />
  );
}
