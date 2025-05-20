import { useTheme } from '../HOCs/ThemeProvider/ThemeProvider';
const hexToRgb = require('hex-to-rgb');

export default function useStylesProvider() {
  const { theme } = useTheme();
  const activeRgb = hexToRgb(theme.colors.active.first);

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

  return {
    header,
    input,
    buttonPrimary,
    buttonSecondary,
  };
}
