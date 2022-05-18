import React ,{ useState,useEffect} from 'react';
import { Route, Switch } from 'react-router';

import Header from './components/common/header';
import Footer from './components/common/footer';
import Login from './components/sub/login';
import Youtube from './components/sub/youtube';
import Board from './components/sub/board';
import Loading from './components/common/loading';
import Chat from './components/main/chat';

import store from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";



import './css/style.scss';
import { BoardServ } from './service/board';
import Chatroom from './components/sub/chatroom';

function App() {
  const [chatStatus,setChatStatus] = useState(false);
  const dispatch = useDispatch();
  
  const {member} = useSelector(store => store.memberReducer);

  const { board } = useSelector(store => store.boardReducer);
  const boardServ = new BoardServ();

  useEffect(() => {
    let nowToken = localStorage.getItem("jwtToken");
    if(nowToken == null) return;
    let userInfo = jwt_decode(nowToken);
    dispatch({type: "loginMember",payload:{
      mail:userInfo.mail,
      id:userInfo.userId,
      level: userInfo.level,
    }})
    boardServ.fetchBoard('get','/list')
    .then(response => {
        dispatch({type: "setBoard",payload: response.data.reverse()});
    })
    .catch(err => {
      console.log(err);
    });
  },[]);


  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/'>
            {
              member.mail == undefined 
              ? <Login />
              : (
                  <div className="subPage" style={{textAlign: "center",}}>
                    <strong style={{fontSize:"1.5rem"}}>환영합니다 {member.mail} 님!</strong>
                    <div>
                      <h6 className='mainTit'>최신글</h6>
                      <ul className='main__latest'>
                        {
                          board.map((item,idx) => {
                            if(idx <= 5) {
                              return (
                                <li className='latest__item' key={item._id}>
                                  <div>
                                    <p>제목 : {item.title}</p>
                                    <span>내용 : {item.content}</span>
                                  </div>
                                  <ul>
                                    <li>작성일 : {item.date}</li>
                                    <li>작성자 : {item.writer}</li>
                                  </ul>
                                </li>
                              )
                            }
                          })
                        }
                      </ul>
                    </div>
                    {
                      chatStatus 
                      ? <Chat />
                      : <button onClick={() => {setChatStatus(true)}} className='btn__chat'>CHAT</button>
                    }
                  </div>
              )
            }
        </Route>
      </Switch>
      <Route path='/youtube'><Youtube /></Route>
      <Route path='/board'><Board /></Route>
      <Route path='/chatroom'><Chatroom /></Route>
      <Footer />
    </div>
  );
}

export default App;
