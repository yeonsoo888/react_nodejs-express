import React, { useState } from "react";
import { useSelector } from "react-redux";

function List({post,handleClickBoard}) {
    const currentUser = useSelector(store => store.memberReducer.member);
    const [modeMypost,setModeMyPost] = useState(false);

    return (
        <>
            <ul className="boardList">
                {
                    post.map((item,idx) => {
                        if(!modeMypost) {
                            return (
                                <li key={item._id} onClick={() => {handleClickBoard(idx)}}>
                                    <strong>제목 : {item.title}</strong>
                                    {
                                        item.writer && <p>작성자 : {item.writer}</p>
                                    }
                                </li>
                            )
                        } else if(currentUser.mail == item.writer) {
                            return (
                                <li key={item._id} onClick={() => {handleClickBoard(idx)}}>
                                    <strong>제목 : {item.title}</strong>
                                    {
                                        item.writer && <p>작성자 : {item.writer}</p>
                                    }
                                </li>
                            )
                        }
                    })
                }
            </ul>
            {
                !modeMypost 
                ? <button onClick={() => {setModeMyPost(true)}}>내가쓴 글</button>
                : <button onClick={() => {setModeMyPost(false)}}>전체 글</button>
            }
        </>
    );
}

export default List;
