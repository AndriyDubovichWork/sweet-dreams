import { hexToCSSFilter } from 'hex-to-css-filter';
import { CSSProperties } from 'react';
import { useTheme } from '../hocs/ThemeProvider/ThemeProvider';
const hexToRgb = require('hex-to-rgb');

export default function useStylesProvider() {
  const { theme, themeName } = useTheme();
  const activeRgb = hexToRgb(theme.colors.active.first);
  const textRgb = hexToRgb(theme.colors.text.first);

  const header: CSSProperties = {
    backgroundColor: theme.colors.primary.second,
    color: theme.colors.text.first,
  };
  const input = {
    color: theme.colors.text.first,
    '--placeholder-color': theme.colors.text.third,
    '--regular-color': theme.colors.primary.third,
    '--active-color': theme.colors.active.first,
    '--active-rgb': `${activeRgb[0]}, ${activeRgb[1]}, ${activeRgb[2]}`,
  };

  const buttonPrimary = {
    position: 'relative',
    padding: '1rem 1.5rem',
    border: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    background: 'transparent',
    overflow: 'visible',
    textAlign: 'center',
    letterSpacing: '1px',
    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
    borderRadius: '100px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',

    color: theme.colors.text.first,
    backgroundColor: theme.colors.active.first,

    '--disabled-button-background': theme.colors.primary.third,
    '--disabled-button-text': theme.colors.text.third,
  };
  const buttonSecondary = {
    position: 'relative',
    padding: '1rem 1.5rem',
    border: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    background: 'transparent',
    overflow: 'visible',
    textAlign: 'center',
    letterSpacing: '1px',
    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
    borderRadius: '100px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',

    color: theme.colors.primary.first,
    backgroundColor: theme.colors.text.first,

    '--disabled-button-text': theme.colors.primary.first,
    '--disabled-button-background': theme.colors.text.third,
  };

  const recordAudio = {
    '--main-background-color': theme.colors.primary.third,
    '--main-icon-color': theme.colors.text.first,
    '--main-icon-color-filter': hexToCSSFilter(theme.colors.text.first).filter,
    '--active-color': theme.colors.active.first,
    '--active-rgb': `${activeRgb[0]}, ${activeRgb[1]}, ${activeRgb[2]}`,
  };

  const calendar = {
    color: theme.colors.text.first,
    '--regular-color': theme.colors.primary.third,
    '--active-color': theme.colors.active.first,
    '--active-rgb': `${activeRgb[0]}, ${activeRgb[1]}, ${activeRgb[2]}`,
    '--main-icon-color-filter': hexToCSSFilter(theme.colors.text.first).filter,
  };

  const audio = {
    '--regular-background-color': theme.colors.primary.third,
    '--regular-text-color': theme.colors.text.first,
    '--secondary-text-color': theme.colors.text.third,
    '--progress-bar-color-rgb': `${textRgb[0]}, ${textRgb[1]}, ${textRgb[2]}`,
  };

  const sortBy: CSSProperties = {
    backgroundColor: theme.colors.primary.third,
    border: '1px solid ' + theme.colors.text.first,
    borderRadius: '12px',
  };

  const sortByElement = {
    enabled: {
      backgroundColor: theme.colors.primary.second,
      color: theme.colors.text.first,
    },
    disabled: {
      backgroundColor: theme.colors.text.second,
      color: theme.colors.primary.first,
    },
  };
  const dreamsList: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
  };

  const audioListElement = {
    header: {
      backgroundColor: theme.colors.primary.second,
      '--regular-text-color': theme.colors.text.first,
    },
    private: {
      backgroundColor: theme.colors.active.first,
      '--regular-text-color': theme.colors.text.first,
    },
    regular: {
      backgroundColor: theme.colors.primary.second,
      '--regular-text-color': theme.colors.text.first,
    },
  };

  const dropDown: CSSProperties = {
    backgroundColor: theme.colors.primary.third,
    color: theme.colors.text.first,
    padding: '0.75rem 1rem',
    width: 'auto',
    borderRadius: '12px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transform: 'translateX(-25%)',
  };
  const mainPage = {
    backgroundColor: theme.colors.primary.first,
    color: theme.colors.text.first,
    height: 'max-content',
    flex: 1,
  };

  const themeSlider = {
    offColor: theme.colors.text.first,
    onColor: theme.colors.text.first,
    offHandleColor: theme.colors.primary.first,
    onHandleColor: theme.colors.primary.first,
    activeBoxShadow: `0 0 0 3px rgba(${activeRgb[0]}, ${activeRgb[1]}, ${activeRgb[2]}, 0.75)`,
    iconColor: theme.colors.text.first,
  };

  const uploadAudio: CSSProperties = {
    backgroundColor: theme.colors.primary.second,
    color: theme.colors.text.first,
  };

  const approveAction: { container: CSSProperties; cross: CSSProperties } = {
    container: {
      backgroundColor: theme.colors.primary.second,
      color: theme.colors.text.first,
      padding: '8%',
      zIndex: '999',
      position: 'fixed',
    },
    cross: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      cursor: 'pointer',
    },
  };
  const errorPage: CSSProperties = {
    backgroundColor: theme.colors.primary.first,
    color: theme.colors.text.first,
    flex: 1,
  };
  const paginator = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      padding: '1rem 0',
    },
    navButton: {
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '100px',
      cursor: 'pointer',
      transition: 'all 0.3s ease-in-out',
      color: theme.colors.text.first,
      backgroundColor: theme.colors.primary.third,
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',

      '&:disabled': {
        color: theme.colors.text.third,
        backgroundColor: theme.colors.primary.second,
        cursor: 'not-allowed',
      },
    },
    pagesContainer: {
      display: 'flex',
      gap: '0.25rem',
    },
    pageButton: {
      padding: '0.5rem 1rem',
      minWidth: '2.5rem',
      border: 'none',
      borderRadius: '100px',
      cursor: 'pointer',
      transition: 'all 0.3s ease-in-out',
      color: theme.colors.text.first,
      backgroundColor: theme.colors.primary.third,

      '&:hover': {
        backgroundColor: theme.colors.primary.second,
        transform: 'translateY(-1px)',
      },

      '&.active': {
        color: theme.colors.text.first,
        backgroundColor: theme.colors.active.first,
        boxShadow: `0 0 0 2px ${theme.colors.active.first}`,
        fontWeight: '600',
      },
    },
    ellipsis: {
      padding: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      color: theme.colors.text.first,
    },
  };

  return {
    header,
    input,
    buttonPrimary,
    buttonSecondary,
    recordAudio,
    calendar,
    audio,
    sortByElement,
    sortBy,
    dreamsList,
    audioListElement,
    dropDown,
    mainPage,
    themeSlider,
    uploadAudio,
    themeName,
    approveAction,
    errorPage,
    paginator,
  };
}
