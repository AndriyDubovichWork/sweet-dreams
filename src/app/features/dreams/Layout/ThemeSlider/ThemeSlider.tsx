import React from 'react';
import Switch from 'react-switch';
import { useTheme } from '../../HOCs/ThemeProvider/ThemeProvider';

export default function ThemeSlider() {
  const { toggleTheme, themeName } = useTheme();
  return <Switch onChange={toggleTheme} checked={themeName === 'dark'} />;
}
