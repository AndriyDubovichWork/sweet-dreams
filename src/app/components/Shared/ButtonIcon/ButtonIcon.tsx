import { ButtonProps } from '@/app/types/components/Shared/Button';
import { IconProps } from '@/app/types/components/Shared/Icon';
import React from 'react';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';

function ButtonIcon({
  children,
  size = 30,
  clickable,
  ...buttonProps
}: IconProps & ButtonProps) {
  return (
    <Button {...buttonProps}>
      <Icon clickable={clickable} size={size}>
        {children}
      </Icon>
    </Button>
  );
}

export default ButtonIcon;
