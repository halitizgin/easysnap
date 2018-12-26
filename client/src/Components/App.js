import React, { Component, Fragment } from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Header from './Header';
import Home from './Pages/Home/Home';
import Login from './Pages/Login';
import Join from './Pages/Join';
import Profile from './Pages/Profile';
import SessionWrapper from './SessionWrapper';

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Header session={session} />
      <Switch>
        <Route path="/" exact render={ () => <Home session={session} /> }  />
        <Route path="/login" render={ () => <Login refetch={refetch} />} />
        <Route path="/join" render={ () => <Join refetch={refetch} />} />
        <Route path="/profile" render={ () => <Profile activeUser={session.activeUser} session={session} /> } />
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
