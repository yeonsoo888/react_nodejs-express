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

  return (
    <>
        <Header  />
          <Switch>
            <Route exact path="/">
              <div className="inner">
                <Login changeAuth={changeAuth} confirmLogin={confirmLogin} setLoginedUser={setLoginedUser} loginedUser={loginedUser} />
              </div>
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
