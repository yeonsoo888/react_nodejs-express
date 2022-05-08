import * as React from 'react';
import { Route, Switch } from 'react-router';

import Header from './components/common/header';
import Footer from './components/common/footer';
import Login from './components/sub/login';

import store from './redux/store';
import { useSelector } from 'react-redux';

import './css/style.scss';
function App() {
  const currentMember = useSelector(store => store.)

  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Header />
          <Login />
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
