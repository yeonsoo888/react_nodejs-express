import { Route , Switch } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Board from './components/board';
import Login from './components/login';
import Header from './components/header';
import {ListGroup} from 'react-bootstrap';
import './css/style.scss';

function App() {
  const [post,setPost] = useState([])
  const [confirmErr,setConfirmErr] = useState(false);

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
        <Header />
          <Switch>
            <Route exact path="/">
              <div className="inner">
                <ListGroup as="ul">
                    {
                      post.map((item,i) => {
                        return (
                          <ListGroup.Item as="li" key={i}>
                            <h4>{item.title}</h4>
                            <p>{item.content}</p>
                          </ListGroup.Item>
                        )
                      })
                    }
                </ListGroup>
                {
                  confirmErr && <p>내용이 없습니다.</p>
                }
              </div>
            </Route>
        </Switch>
        <Route path="/write">
          <Board data={post} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
    </>
  );
}

export default App;
