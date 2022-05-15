// import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "./board/list";
import View from "./board/view";
import Write from "./board/write";
import Loading from "../common/loading";

import { BoardServ ,fetchBoard } from "../../service/board";

export default function Board() {
    const currentUser = useSelector(store => store.memberReducer.member);
    const post = useSelector(store => store.boardReducer.board);
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const [selectPost, setSelectPost] = useState({
        _id: null,
        title: null,
        content: null,
        date: null,
        writer: null,
    });
    
    const board = new BoardServ();

    const [mode, setMode] = useState("list");

    const handleClickBoard = (idx) => {
        const target = post[idx];
        const newSelectPost = {
            _id: target._id,
            title: target.title,
            content: target.content,
            writer: target.writer,
            date: target.date,
        }
        setSelectPost({ ...selectPost, ...newSelectPost });
        setMode("view");
    }

    useEffect(() => {
        board.fetchBoard('get','/list')
        .then(response => {
            dispatch({type: "setBoard",payload: response.data.reverse()})
            setLoading(true);
        })
    }, []);

    return (
        <>
            <div className="limit">
                {
                    !loading 
                    ? <Loading/>
                    : (
                        <div className="subPage">
                            {
                                mode == "list" && <List post={post} handleClickBoard={handleClickBoard} />
                            }
                            {
                                mode == "view" && <View post={post} selectPost={selectPost} setMode={setMode} />
                            }
                            {
                                mode == "write" && <Write currentUser={currentUser} selectPost={selectPost} setMode={setMode} setSelectPost={setSelectPost} post={post} mode={mode} />
                            }
                            {
                                mode == "modify" && <Write currentUser={currentUser} selectPost={selectPost} setMode={setMode} setSelectPost={setSelectPost} post={post} mode={mode} />
                            }
                            <div className="board__btnWrite">
                                <button className="board__btnWrite" onClick={()=>{setMode("write")}}>글쓰기</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}
