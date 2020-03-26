import React from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core/';
import { ChildrenDemo } from './pages';
import { defaultTheme } from './theme';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <ChildrenDemo />
    </ThemeProvider>
  );
}

export default App;
