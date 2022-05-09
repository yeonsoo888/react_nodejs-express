import React from "react";

function List({post,handleClickBoard}) {
    return (
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
    );
}

export default List;
