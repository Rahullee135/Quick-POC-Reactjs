import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './Containers/SignIn';
import FakeApi from './Components/FakeApi';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route  path="/fakeapi" component={FakeApi} />
    </Switch>
  </Router>
);

render(<App />, document.getElementById('root'));


