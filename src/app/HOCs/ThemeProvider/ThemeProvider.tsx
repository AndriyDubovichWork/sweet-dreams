import { ThemeContextValue, ThemeName, Themes } from '@/app/types/HOCs/theme';
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeName>('light'); // default theme

  const themes: Themes = {
    light: {
      colors: {
        primary: '#6200ee',
        background: '#ffffff',
        text: '#000000',
      },
      spacing: {
        small: '8px',
        medium: '16px',
        large: '24px',
      },
    },
    dark: {
      colors: {
        primary: '#bb86fc',
        background: '#121212',
        text: '#ffffff',
      },
      spacing: {
        small: '8px',
        medium: '16px',
        large: '24px',
      },
    },
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider
      value={{ theme: themes[theme], toggleTheme, themeName: theme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context as ThemeContextValue;
};
