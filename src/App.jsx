import React from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider, CssBaseline } from '@material-ui/core/';
import { defaultTheme } from './theme';
import { AuthLayoutRoute, PrivateLayoutRoute } from './routes';
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
      <Router>
        <Switch>
          <AuthLayoutRoute path="/login" component={Login} />
          <PrivateLayoutRoute exact path="/" component={Trainee} />
          <PrivateLayoutRoute path="/children" component={ChildrenDemo} />
          <PrivateLayoutRoute path="/input-demo" component={InputDemo} />
          <PrivateLayoutRoute path="/text-field-demo" component={TextFieldDemo} />
          <PrivateLayoutRoute component={NoMatch} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
