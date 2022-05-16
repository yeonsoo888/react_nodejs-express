import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import store from "../../redux/store";
import { Chatserv } from "../../service/chat";

function Chat() {
    const {member} = useSelector(store => store.memberReducer);
    const [romNum,setRomNum] = useState(0);
    const [chatList,setChatList] = useState([]);

    console.log(member);
    const elTextarea = useRef(null);

    const chat = new Chatserv();

    const sendMessage = (e) => {
        console.log(elTextarea.current.value);
        e.preventDefault();
        chat.chatServ('post','/message',{
            parent : romNum,
            userid: member.id,
            content: elTextarea.current.value,
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            
        })
    }

    useEffect(() => {
        chat.chatServ('post','/chat',{
            userId: member.id,
        })
        .then(response => {
            setRomNum(response.data[0].roomId);
            setChatList(response.data[1]);
        })
        .catch(err => {
            console.log(err);  
        })
    },[])
    return (
        <>
            <div className="btnChatWrap">
                <button className="btnChat">CHAT</button>
            </div>
            <div className="chatWrap">
                <div className="chat__inner">
                    <div className="chat__listWrap">
                        <ul className="chat__list">
                            {
                                chatList.map((item,idx) => {
                                    if(member.id == item.userid) {
                                        return (
                                            <li className="onwer" key={idx}>
                                                <div>
                                                    <strong>{member.mail}</strong>
                                                    <p>{item.content}</p>
                                                    <span>{item.date}</span>
                                                </div>
                                            </li>
                                        )
                                    } else {
                                        return (
                                            <li className="admin" key={idx}>
                                                <div>
                                                    <strong>{item.id}</strong>
                                                    <p>{item.content}</p>
                                                    <span>{item.date}</span>
                                                </div>
                                            </li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                    <form onSubmit={(e) => {sendMessage(e)}}>
                        <div className="chat__inputWrap">
                            <textarea name="" ref={elTextarea}></textarea>
                            <button >글쓰기</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Chat;
