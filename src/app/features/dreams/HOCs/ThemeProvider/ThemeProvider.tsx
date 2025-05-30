import {
  ThemeContextValue,
  ThemeName,
  Themes,
} from '@/app/features/dreams/types/HOCs/theme';
import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeName>(
    (Cookies.get('theme') as ThemeName) || 'dark'
  );

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
          second: '#EBEBEB',
          third: '#C6C6C6',
        },
        text: {
          first: '#000000',
          second: '#171717',
          third: '#222222',
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
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      Cookies.set('theme', newTheme);

      return newTheme;
    });
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
