import {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [post,setPost] = useState([])

  useEffect(() => {
    axios.get('/list')
    .then((Response)=>{
      console.log(Response.data)
      setPost(Response.data);
    })
    .catch((Error)=>{console.log(Error)})
  }, []);

  return (
    <div className="App">
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
