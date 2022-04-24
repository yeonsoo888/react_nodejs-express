import { Route } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Form from './components/form';


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
    <div className="App">
      <header>
        123
      </header>
      <Route exact path="/">
        <ul>
          {
            post.map((item,i) => {
              return (
                <li>
                  <h4>{item.title}</h4>
                  <p>{item.content}</p>
                </li>
              )
            })
          }
        </ul>
      </Route>
      <Route path="/write">
        <Form data={post} />
      </Route>
      
    </div>
  );
}

export default App;
