import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import List from "./board/list";
import View from "./board/view";

export default function Board() {
    const currentUser = useSelector(store => store.memberReducer.member);
    const [post, setPost] = useState([]);
    const [selectPost, setSelectPost] = useState({
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
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleClickBoard = (idx) => {
        const target = post[idx];
        const newSelectPost = {
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
                        mode == "list" && <List post={post} handleClickBoard={handleClickBoard} />
                    }
                    {
                        mode == "view" && <View selectPost={selectPost} setMode={setMode} />
                    }
                    {
                        mode == "write" && (
                            <div className="boardWrite">
                                <form>
                                    <table>
                                        <tr>
                                            <th>제목</th>
                                            <td>
                                                <input type="text" name="title" placeholder="제목" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>내용</th>
                                            <td>
                                                <textarea name="content" placeholder="내용"></textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                날짜
                                            </th>
                                            <td>
                                                <input type="text" name="date" placeholder="날짜" />
                                            </td>
                                        </tr>
                                    </table>
                                    <input type="hidden" name="writer" value={currentUser.mail} hidden />
                                    <button type="button" onClick={() => setMode("list")}>목록</button>
                                    <button type="submit">작성완료</button>
                                </form>
                            </div>
                        )
                    }
                    <button onClick={()=>{setMode("write")}}>글쓰기</button>
                </div>
            </div>
        </>
    );
}
