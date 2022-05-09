import React from "react";

function View({selectPost,setMode}) {
    return (
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
    );
}

export default View;
