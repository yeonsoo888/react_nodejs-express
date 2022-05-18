import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, Route, useParams, Switch } from 'react-router-dom';
import { Chatserv } from '../../service/chat'
import ChatView from './chatView';


export default function Chatroom() {
    const chatRoom = new Chatserv();
    const [chatRommList,setChatRommList] = useState([]);
    
    useEffect( () => {
        chatRoom.chatServ('get','/chatList')
        .then(response => {
            setChatRommList(response.data);
        });
    },[])

    return (
        <div className="subPage">
            <div className="limit">
                <ul className='chatRomm__list'>
                    {
                        chatRommList.map( (item , i) => {
                            return (
                                <li key={i}>
                                    <Link to={`/chatroom/view/${item.owner}`}><strong>{item.title}</strong></Link>
                                </li>
                            )
                        })
                    }
                </ul>
                
                <Switch>
                    <Route path="/chatroom/view/:id">
                        <ChatView  />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

