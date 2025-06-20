import { ButtonHTMLAttributes, ReactNode } from 'react';
import style from './Button.module.scss';
import useStylesProvider from '@/app/common/hooks/useStylesProvider';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isPrimary?: boolean;
}

export default function Button({
  children,
  isPrimary = false,
  ...props
}: ButtonProps) {
  const styles = useStylesProvider();
  return (
    <button
      {...props}
      style={
        isPrimary
          ? (styles.buttonPrimary as React.CSSProperties)
          : (styles.buttonSecondary as React.CSSProperties)
      }
      className={style.button}
    >
      {children}
    </button>
  );
}
