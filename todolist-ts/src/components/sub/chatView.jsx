import React , { useEffect, useState,useRef} from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Chatserv } from '../../service/chat';
import { Member } from '../../service/member';

export default function ChatView() {
    const parm = useParams();
    const {member} = useSelector(store => store.memberReducer)
    const elTextarea = useRef(null);
    const [romNum,setRomNum] = useState(0);
    const [targetId,setTargetId] = useState("");
    const [chatList,setChatList] = useState([
        {
            content: null,
            date: null,
        }
    ])

    const chat = new Chatserv();
    const mem = new Member();

    const sendMessage = (e) => {
        e.preventDefault();
        chat.chatServ('post','/message',{
            parent : romNum,
            userid: member.id,
            content: elTextarea.current.value,
        })
        .then(response => {
            console.log(response);
        })
    }

    useEffect( () => {
        console.log("ok");
        chat.chatServ('post','/admChat',{
            userId: parm.id
        })
        .then(response => {
            console.log(response);
            if(response.length !== 0) {
                setChatList(response.data[1]);
                setRomNum(response.data[0].roomId);
            }
        })
        .catch(err => {
            console.log(err);  
        })

        mem.mem('post','/member',{
            targetId : parm.id
        })
        .then(res => {
            setTargetId(res.data.mail);
        })
    },[]);


    return (
        <>
            <div className='chatViewWrap'>
                <ul>
                    {
                        chatList.map((item,idx) => {
                            if(parm.id == item.userid) {
                                return (
                                    <li className="owner" key={idx}>
                                        <div>
                                            <strong>{targetId}</strong>
                                            <p>{item.content}</p>
                                            <span>{item.date}</span>
                                        </div>
                                    </li>
                                )
                            } else {
                                return (
                                    <li className="admin" key={idx}>
                                        <div>
                                            <strong>{member.mail}</strong>
                                            <p>{item.content}</p>
                                            <span>{item.date}</span>
                                        </div>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
                <form onSubmit={(e) => {sendMessage(e)}}>
                    <div className="chat__inputWrap">
                        <textarea name="" ref={elTextarea}></textarea>
                        <button >글쓰기</button>
                    </div>
                </form>
            </div>
        </>
    )
}