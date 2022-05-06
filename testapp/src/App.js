import { Route , Switch } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Board from './components/board';
import Login from './components/login';
import Header from './components/header';
import List from './components/list';

import './css/style.scss';

function App() {
  const [post,setPost] = useState([])
  const [confirmErr,setConfirmErr] = useState(false);
  const [confirmLogin,setConfirmLogin] = useState(false);
  const [loginedUser,setLoginedUser] = useState({
    email : null,
  })


  const changeAuth = () => {
    setConfirmLogin(!confirmLogin);
    console.log(confirmLogin);
  }

  useEffect(() => {
    axios.get('/list')
    .then((Response)=>{
      setPost(Response.data);
    })
    .catch((Error)=>{
      setConfirmErr(true);
      console.log(Error);
    })
  }, []);

  console.log(confirmLogin);
  return (
    <>
        <Header confirmLogin={confirmLogin} />
          <Switch>
            <Route exact path="/">
              {
                !confirmLogin
                ? 
                <div className="inner">
                  <Login changeAuth={changeAuth} confirmLogin={confirmLogin} setConfirmLogin={setConfirmLogin} setLoginedUser={setLoginedUser} loginedUser={loginedUser} />
                </div>
                :
                <div className="inner">
                  <p>안녕하세요 {loginedUser.email} 님</p>
                </div>
              }
            </Route>
        </Switch>
        <Route path="/list" >
          <List post={post} loginedUser={loginedUser} />
        </Route>
        <Route path="/write">
          <Board data={post} confirmErr={confirmErr} />
        </Route>
    </>
  );
}

export default App;
