import React from 'react';
import Switch from 'react-switch';
import { useTheme } from '../../HOCs/ThemeProvider/ThemeProvider';
import useStylesProvider from '../../hooks/useStylesProvider';
import { CiSun } from 'react-icons/ci';
import { BsMoon } from 'react-icons/bs';
import Centered from '../../HOCs/Centered/Centered';

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
