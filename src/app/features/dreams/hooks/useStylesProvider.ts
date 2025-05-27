import { useTheme } from '../HOCs/ThemeProvider/ThemeProvider';
import { hexToCSSFilter } from 'hex-to-css-filter';
import DreamsList from "@/app/dream/list/page";
const hexToRgb = require('hex-to-rgb');

export default function useStylesProvider() {
  const { theme } = useTheme();
  const activeRgb = hexToRgb(theme.colors.active.first);
  const textRgb = hexToRgb(theme.colors.text.first);

  const header = {
    backgroundColor: theme.colors.primary.second,
  };
  const input = {
    color: theme.colors.text.first,
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

  const sortBy = {
    backgroundColor:theme.colors.primary.third,
    border: '1px solid ' + theme.colors.text.first,
    borderRadius: '12px',
  }

  const sortByElement = {
    enabled: {
      backgroundColor: theme.colors.primary.third,
      color: theme.colors.text.first,

    },
    disabled: {
      backgroundColor: theme.colors.text.second,
      color: theme.colors.primary.first,
    },
  };
  const dreamsList ={
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1rem 1rem',
  }

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
    dreamsList
  };
}
