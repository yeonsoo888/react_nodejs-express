import React , {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { BoardServ } from "../../../service/board";

function View({selectPost,setMode}) {
    const currentUser = useSelector(store => store.memberReducer.member);
    const post = useSelector(store => store.boardReducer.board);
    const dispatch = useDispatch();
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
            const removeBoard = post.filter(item => item._id !== res.data.targetId)
            dispatch({type:'setBoard',payload:removeBoard})
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
