import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import store from "../../redux/store";
import { Chatserv } from "../../service/chat";

function Chat() {
    const {member} = useSelector(store => store.memberReducer);
    const [rommNum,setRommNum] = useState(0);

    const elTextarea = useRef(null);

    const chat = new Chatserv();

    const sendMessage = (e) => {
        console.log("ok");
        e.preventDefault();
        chat.chatServ('post','/message',{
            parent : rommNum,
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
            setRommNum(response.data.roomId);
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
                            <li className="onwer">
                                <div>
                                    <strong>이름</strong>
                                    <p>채팅내용</p>
                                    <span>2020.05.15 22:08</span>
                                </div>
                            </li>
                            <li className="admin">
                                <div>
                                    <strong>이름</strong>
                                    <p>채팅내용</p>
                                    <span>2020.05.15 22:08</span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <strong>이름</strong>
                                    <p>채팅내용</p>
                                    <span>2020.05.15 22:08</span>
                                </div>
                            </li>
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
