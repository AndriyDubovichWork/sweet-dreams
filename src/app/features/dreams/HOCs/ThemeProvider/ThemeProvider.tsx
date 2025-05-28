import {
  ThemeContextValue,
  ThemeName,
  Themes,
} from '@/app/features/dreams/types/HOCs/theme';
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeName>('dark'); // default theme

  const themes: Themes = {
    light: {
      colors: {
        active: {
          first: '#EB694A',
          second: '#E06446',
          third: '#E35937FF',
        },
        primary: {
          first: '#FFFFFF',
          second: '#D7D7D7',
          third: '#8B8B8B',
        },
        text: {
          first: '#3B3A3A',
          second: '#363636',
          third: '#2F2F2F',
        },
      },
    },
    dark: {
      colors: {
        active: {
          first: '#EB694A',
          second: '#E06446',
          third: '#E35937FF',
        },
        primary: {
          first: '#3B3A3A',
          second: '#363636',
          third: '#2F2F2F',
        },
        text: {
          first: '#FFFFFF',
          second: '#D7D7D7',
          third: '#8B8B8B',
        },
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
