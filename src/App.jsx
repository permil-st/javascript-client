import React from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core/';
import { Trainee } from './pages';
import { defaultTheme } from './theme';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Trainee />
    </ThemeProvider>
  );
}

export default App;
