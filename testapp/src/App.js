import { Route } from 'react-router-dom';
import {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

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
        <Route path="/test">
          데이터
        </Route>
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
    </div>
  );
}

export default App;
