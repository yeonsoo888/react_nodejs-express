import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import List from "./board/list";
import View from "./board/view";
import Write from "./board/write";
import Loading from "../common/loading";

export default function Board() {
    const currentUser = useSelector(store => store.memberReducer.member);
    const [post, setPost] = useState([]);
    const [loading,setLoading] = useState(false);
    const [selectPost, setSelectPost] = useState({
        _id: null,
        title: null,
        content: null,
        date: null,
        writer: null,
    });

    const [mode, setMode] = useState("list");

    const fetchBoard = async () => {
        await axios.get('list')
            .then(response => {
                setPost(response.data.reverse());
                setLoading(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

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
        fetchBoard();
    }, []);

    return (
        <>
            <div className="limit">
                <div className="subPage">
                    {
                        !loading && <Loading/>
                    }
                    {
                        mode == "list" && <List post={post} handleClickBoard={handleClickBoard} />
                    }
                    {
                        mode == "view" && <View post={post} setPost={setPost} selectPost={selectPost} setMode={setMode} />
                    }
                    {
                        mode == "write" && <Write currentUser={currentUser} selectPost={selectPost} setMode={setMode} setSelectPost={setSelectPost} post={post} setPost={setPost} mode={mode} />
                    }
                    {
                        mode == "modify" && <Write currentUser={currentUser} selectPost={selectPost} setMode={setMode} setSelectPost={setSelectPost} post={post} setPost={setPost} mode={mode} />
                    }
                    <div className="board__btnWrite">
                        <button className="board__btnWrite" onClick={()=>{setMode("write")}}>글쓰기</button>
                    </div>
                </div>
            </div>
        </>
    );
}
