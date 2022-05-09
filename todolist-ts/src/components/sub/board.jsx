import axios from "axios";
import React , {useEffect, useState} from "react";


export default function Board() {
    const [post,setPost] = useState([]);
    const [selectPost,setSelectPost] = useState({
        title : null,
        content: null,
        date : null,
        writer: null,
    });

    const [mode,setMode] = useState("list");

    const fetchBoard = async () => {
        await axios.get('list')
        .then( response => {
            setPost(response.data.reverse());
        })
        .catch( err => {
            console.log(err);
        })
    }

    const handleClickBoard = (idx) => {
        const target = post[idx];
        const newSelectPost = {
            title : target.title,
            content: target.content,
            writer : target.writer,
            date : target.date,
        }
        setSelectPost({...selectPost,...newSelectPost});
        setMode("view");
    }

    useEffect(() => {
        fetchBoard();
    }, []);

    return (
        <>
            <div className="limit">
                <div className="subPage">
                    {
                        mode == "list" && 
                        (
                            <ul className="boardList">
                            {
                                post.map((item,idx) => {
                                    return (
                                        <li key={item._id} onClick={() => {handleClickBoard(idx)}}>
                                            <strong>제목 : {item.title}</strong>
                                            {
                                                item.writer && <p>작성자 : {item.writer}</p>
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        ) 
                    }
                    {
                        mode == "view" && (
                            <div className="boardView">
                                <div className="titWrap">
                                    <h4>{selectPost.title}</h4>
                                    <ul>
                                        <li>작성자 : {selectPost.writer}</li>
                                        <li>작성일 : {selectPost.date}</li>
                                        <li></li>
                                    </ul>
                                </div>
                                <p className="contents">{selectPost.content}</p>
                                <div className="btnWrap">
                                    <button onClick={() => {setMode("list")}}>목록으로</button>
                                </div>
                            </div>
                        )
                    }
                    
                </div>
            </div>
        </>
    );
}
