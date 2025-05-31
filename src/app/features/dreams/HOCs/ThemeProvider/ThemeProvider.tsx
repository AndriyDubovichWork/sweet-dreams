'use client';

import {
  ThemeContextValue,
  ThemeName,
  Themes,
} from '@/app/features/dreams/types/HOCs/theme';
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import cookies from 'js-cookie';
import Centered from '../Centered/Centered';
import Spinner from '../../components/shared/Spinner/Spinner';

const ThemeContext = createContext({});
const THEME_COOKIE_NAME = 'preferred_theme';

const getSystemThemePreference = (): ThemeName => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return 'dark';
};

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
  Skeleton?: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<ThemeName>(() => {
    const savedTheme = cookies.get(THEME_COOKIE_NAME);

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return getSystemThemePreference();
  });
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    // Only run on client side
    const savedTheme = cookies.get(THEME_COOKIE_NAME);
    const initialTheme =
      savedTheme === 'light' || savedTheme === 'dark'
        ? savedTheme
        : getSystemThemePreference();

    setTheme(initialTheme);
    setIsReady(true);
  }, []);
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

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      cookies.set(THEME_COOKIE_NAME, newTheme, {
        expires: 365,
        sameSite: 'Lax',
        secure: process.env.NODE_ENV === 'production',
      });
      return newTheme;
    });
  }, []);

  if (!isReady) {
    return (
      <Centered absolute>
        <Spinner size={50} />
      </Centered>
    );
  }

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
