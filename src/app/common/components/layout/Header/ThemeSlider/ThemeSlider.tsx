import React from 'react';
import Switch from 'react-switch';
import { CiSun } from 'react-icons/ci';
import { BsMoon } from 'react-icons/bs';
import { useTheme } from '@/app/common/hocs/ThemeProvider/ThemeProvider';
import useStylesProvider from '@/app/common/hooks/useStylesProvider';
import Centered from '@/app/common/hocs/Centered/Centered';

export default function ThemeSlider() {
  const { toggleTheme, themeName } = useTheme();
  const { themeSlider } = useStylesProvider();

  return (
    <Switch
      onChange={toggleTheme}
      checked={themeName === 'dark'}
      offColor={themeSlider.offColor}
      onColor={themeSlider.onColor}
      offHandleColor={themeSlider.offHandleColor}
      onHandleColor={themeSlider.onHandleColor}
      activeBoxShadow={themeSlider.activeBoxShadow}
      uncheckedIcon={false}
      checkedIcon={false}
      uncheckedHandleIcon={<CiSun color={themeSlider.iconColor} size={25} />}
      checkedHandleIcon={
        <Centered>
          <BsMoon color={themeSlider.iconColor} size={20} />
        </Centered>
      }
    />
  );
}
