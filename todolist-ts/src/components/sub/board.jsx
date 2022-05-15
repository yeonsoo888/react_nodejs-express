// import axios from "axios";
import React, { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "./board/list";
import View from "./board/view";
import Write from "./board/write";
import Loading from "../common/loading";


export default function Board() {
    const currentUser = useSelector(store => store.memberReducer.member);
    const post = useSelector(store => store.boardReducer.board);
    
    const [selectPost, setSelectPost] = useState({
        _id: null,
        title: null,
        content: null,
        date: null,
        writer: null,
    });
    

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

    return (
        <>
            <div className="limit">
                <div className="subPage">
                    {
                        mode == "list" && <List handleClickBoard={handleClickBoard} />
                    }
                    {
                        mode == "view" && <View selectPost={selectPost} setMode={setMode} />
                    }
                    {
                        mode == "write" && <Write currentUser={currentUser} selectPost={selectPost} setMode={setMode} setSelectPost={setSelectPost} post={post} mode={mode} />
                    }
                    {
                        mode == "modify" && <Write currentUser={currentUser} selectPost={selectPost} setMode={setMode} setSelectPost={setSelectPost} post={post} mode={mode} />
                    }
                    {
                        mode !== "write" && (
                            <div className="board__btnWrite">
                                <button className="board__btnWrite" onClick={()=>{setMode("write")}}>글쓰기</button>
                            </div>
                        )
                    }
                    
                </div>
            </div>
        </>
    );
}
