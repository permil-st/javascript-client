import { createMuiTheme } from '@material-ui/core/styles';

export const defaultTheme = createMuiTheme({
  typography: {
    fontFamily: '"Comic Sans MS", "cursive", "sans-serif"',
    fontSize: 10,
    htmlFontSize: 10,
  },
});

export const customTheme = createMuiTheme({
  typography: {
    fontSize: 20,
  },
});
