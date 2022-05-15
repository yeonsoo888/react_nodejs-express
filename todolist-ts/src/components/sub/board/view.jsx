import React , {useState} from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { fetchRemove } from "../../../service/board";
import { BoardServ } from "../../../service/board";

function View({selectPost,setMode,post,setPost}) {
    const currentUser = useSelector(store => store.memberReducer.member);
    const board = new BoardServ();

    const handleDelete = () => {
        board.fetchBoard(
            'delete',
            '/delete',
            {
                _id: selectPost._id
            }
        )
        .then(res => {
            const removalItemId = res.data.targetId
            setPost(() => {
                return post.filter(item => item._id !== removalItemId);
            });
            setMode("list");
        });
    };

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
                {
                    selectPost.writer === currentUser.mail && (
                        <>
                            <button onClick={handleDelete}>삭제</button>
                            <button onClick={()=> {setMode("modify");}}>수정</button>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default View;
