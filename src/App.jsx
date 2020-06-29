import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@material-ui/core/';
import { ApolloProvider } from '@apollo/react-components';

import { defaultTheme } from './theme';
import { client } from './lib';
import { AuthLayoutRoute, PrivateLayoutRoute } from './routes';
import { SnackBarProvider } from './contexts';
import {
  Login,
  Trainee,
  ChildrenDemo,
  InputDemo,
  TextFieldDemo,
  NoMatch,
} from './pages';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <SnackBarProvider>
        <ApolloProvider client={client}>
          <Router>
            <Switch>
              <AuthLayoutRoute path="/login" component={Login} />
              <PrivateLayoutRoute path="/trainee" component={Trainee} />
              <PrivateLayoutRoute path="/children" component={ChildrenDemo} />
              <PrivateLayoutRoute path="/input-demo" component={InputDemo} />
              <PrivateLayoutRoute path="/text-field-demo" component={TextFieldDemo} />
              <PrivateLayoutRoute component={NoMatch} />
            </Switch>
          </Router>
        </ApolloProvider>
      </SnackBarProvider>
    </ThemeProvider>
  );
}

export default App;
