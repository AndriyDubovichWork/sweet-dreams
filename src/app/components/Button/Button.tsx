import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
}

export default function Button({ children, icon, ...props }: ButtonProps) {
  return (
    <button className={styles.cloudButton} {...props}>
      <span className={styles.buttonContent}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
      </span>

      <>
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className={props.disabled ? styles.raindrop : styles.circle}
          />
        ))}
      </>
    </button>
  );
}
