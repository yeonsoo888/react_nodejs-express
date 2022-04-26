import { Route , Switch } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Board from './components/board';
import Header from './components/header';
import {ListGroup} from 'react-bootstrap';
import './css/style.scss';

function App() {
  const [post,setPost] = useState([])

  useEffect(() => {
    axios.get('/list')
    .then((Response)=>{
      setPost(Response.data);
    })
    .catch((Error)=>{console.log(Error)})
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
              </div>
            </Route>
        </Switch>
        <Route path="/write">
          <Board data={post} />
        </Route>
    </>
  );
}

export default App;
