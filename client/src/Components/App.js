import React, { Component, Fragment } from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Header from './Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Join from './Pages/Join';
import SessionWrapper from './SessionWrapper';

const Root = () => (
  <Router>
    <Fragment>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/join" component={Join} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

const RootWithSessionWrapper = SessionWrapper(Root);

class App extends Component {
  render() {
    return (
      <div id="app">
          <div className="container">
            <RootWithSessionWrapper />
          </div>
      </div>
    );
  }
}

export default App;
