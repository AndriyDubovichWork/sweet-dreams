export type Theme = {
  colors: {
    primary: string;
    background: string;
    text: string;
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
};
export type ThemeName = 'light' | 'dark';

export type Themes = Record<ThemeName, Theme>;

export type ThemeContextValue = {
  theme: Theme;
  themeName: ThemeName;
  toggleTheme: () => void;
};
