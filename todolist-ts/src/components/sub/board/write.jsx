import axios from "axios";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BoardServ } from "../../../service/board";
import { fecthWrite , fetchModify } from "../../../service/board";

export default function Write({currentUser,setMode,mode,selectPost}) {
    const post = useSelector(store => store.boardReducer.board);
    const dispatch = useDispatch();

    const idInput = useRef(null);
    const titInput = useRef(null);
    const cntsInput = useRef(null);
    const writerInput = useRef(null);
    const today = new Date()
    const board = new BoardServ();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        board.fetchBoard(
            'post',
            '/add',
            {
                title: titInput.current.value,
                content: cntsInput.current.value,
                date: today.toLocaleDateString(),
                writer : writerInput.current.value,
            }
        )
        .then(res => {
            const newPost = [
                {
                    _id : res.data._id,
                    title: titInput.current.value,
                    content: cntsInput.current.value,
                    date: today.toLocaleDateString(),
                    writer : writerInput.current.value,
                },
                ...post,
            ];
            dispatch({type:"setBoard", payload:newPost})
            setMode("list");
        });
    }

    const handleModify = (e) => {
        e.preventDefault();
        board.fetchBoard(
            'put',
            '/modify',
            {
                _id: idInput.current.value,
                title: titInput.current.value,
                content: cntsInput.current.value,
                writer : writerInput.current.value,
            }
        )
        .then(res => {
            const modifyPost = post.map(item => {
                if(item._id === parseInt(idInput.current.value)) {
                    item.title = titInput.current.value;
                    item.content = cntsInput.current.value;
                }
                return item;
            })
            dispatch({type:"setBoard", payload:modifyPost})
            setMode('list');
        });
    }

    return (
        <div className="boardWrite">
            <form 
                onSubmit={(e) => {
                    if(mode == "write") {
                        handleSubmit(e);
                    } else {
                        handleModify(e);
                    }
                }}
            >
                {
                    mode == "modify" 
                    ? <input type="hidden" name="_id" value={selectPost._id} ref={idInput} />
                    : null
                }
                <input type="hidden" name="writer" value={currentUser.mail} hidden ref={writerInput} />
                <table>
                    <tbody>
                        <tr>
                            <th>제목</th>
                            <td>
                                {
                                    mode == "write" 
                                    ? <input type="text" name="title" placeholder="제목" ref={titInput} />
                                    : <input type="text" name="title" placeholder="제목" ref={titInput} defaultValue={selectPost.title} />
                                }
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>
                                {
                                    mode == "write" 
                                    ? <textarea name="content" placeholder="내용" ref={cntsInput}></textarea>
                                    : <textarea name="content" placeholder="내용" ref={cntsInput} defaultValue={selectPost.content}></textarea>
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" onClick={() => setMode("list")}>목록</button>
                <button type="submit">작성완료</button>
            </form>
        </div>
    );
}
