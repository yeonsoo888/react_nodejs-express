import React, { useState ,useEffect } from "react";
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
                ? <div className="board__btnWrite"> <button className="" onClick={() => {setModeMyPost(true)}}>내가쓴 글</button> </div>
                : <div className="board__btnWrite"> <button className="" onClick={() => {setModeMyPost(false)}}>전체 글</button> </div>
            }
        </>
    );
}

export default List;
