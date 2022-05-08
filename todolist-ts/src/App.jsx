import React ,{ useEffect} from 'react';
import { Route, Switch } from 'react-router';

import Header from './components/common/header';
import Footer from './components/common/footer';
import Login from './components/sub/login';

import store from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";

import './css/style.scss';
function App() {
  const dispatch = useDispatch();
  const currentMember = useSelector(store => store.memberReducer.member);

  useEffect(() => {
    let nowToken = localStorage.getItem("jwtToken");
    if(nowToken == null) return;
    let userInfo = jwt_decode(nowToken);
    dispatch({type: "loginMember",payload:{mail:userInfo.mail}})
  },[]);
  
  useEffect(() => {
    console.log(currentMember);
  },[currentMember]);

  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Header />
            {
              currentMember.mail == undefined && <Login />
            }
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
