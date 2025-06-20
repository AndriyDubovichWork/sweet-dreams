export type Theme = {
  colors: {
    active: {
      first: string;
      second: string;
      third: string;
    };

    primary: {
      first: string;
      second: string;
      third: string;
    };

    text: {
      first: string;
      second: string;
      third: string;
    };
  };
};
export type ThemeName = 'light' | 'dark';

export type Themes = Record<ThemeName, Theme>;

export type ThemeContextValue = {
  theme: Theme;
  themeName: ThemeName;
  toggleTheme: () => void;
};
