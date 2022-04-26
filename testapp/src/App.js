import { Route , Switch } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Form from './components/form';
import Header from './components/header';

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
              <ul>
                {
                  post.map((item,i) => {
                    return (
                      <li key={i}>
                        <h4>{item.title}</h4>
                        <p>{item.content}</p>
                      </li>
                    )
                  })
                }
              </ul>
            </Route>
        </Switch>
        <Route path="/write">
          <Form data={post} />
        </Route>
    </>
  );
}

export default App;
