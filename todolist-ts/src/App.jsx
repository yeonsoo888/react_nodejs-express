import React ,{ useEffect} from 'react';
import { Route, Switch } from 'react-router';

import Header from './components/common/header';
import Footer from './components/common/footer';
import Login from './components/sub/login';
import Youtube from './components/sub/youtube';
import Board from './components/sub/board';

import store from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";

import YoutubeServ from './service/youtube';

import './css/style.scss';

function App() {
  const dispatch = useDispatch();
  const currentMember = useSelector(store => store.memberReducer.member);

  // 최초 접속시 loalstorage에 로그인 토큰이 있는지 확인 후 로그인 처리
  useEffect(() => {
    let nowToken = localStorage.getItem("jwtToken");
    if(nowToken == null) return;
    let userInfo = jwt_decode(nowToken);
    dispatch({type: "loginMember",payload:{mail:userInfo.mail}})
  },[]);
  
  const youtube = new YoutubeServ(process.env.REACT_APP_YOUTUBE_KEY,{
    maxLength: 10,
    search: "프론트엔드 개발",
  });

  const fetchPopularYoutube = async () => {
    await youtube.mostPopular()
      .then(res=>{
        dispatch({type:"setYoutube", payload: res});
      })
  }

  useEffect(()=>{
    fetchPopularYoutube();
  },[]);



  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/'>
            {
              currentMember.mail == undefined 
              ?
              <Login />
              :
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
              </ul>
            }
        </Route>
      </Switch>
      <Route path='/youtube'>
          <Youtube />
      </Route>
      <Route path='/board'>
          <Board />
      </Route>
      <Footer />
    </div>
  );
}

export default App;
