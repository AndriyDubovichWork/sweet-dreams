import { IconProps } from '@/app/types/components/Icon';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import { ButtonProps } from '@/app/types/components/Button';

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
