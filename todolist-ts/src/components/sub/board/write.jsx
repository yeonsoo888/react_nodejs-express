import axios from "axios";
import React, { useRef } from "react";

export default function Write({currentUser,setMode,setPost,post}) {
    const titInput = useRef(null);
    const cntsInput = useRef(null);
    const dateInput = useRef(null);
    const writerInput = useRef(null);

    const fecthWrite = async () => {
        await axios({
            method: 'post',
            credentials: 'include',
            url: "/add",
            data: {
                title: titInput.current.value,
                content: cntsInput.current.value,
                date: dateInput.current.value,
                writer : writerInput.current.value,
            }
        })
        .then(res => {
            const newPost = [
                {
                    title: titInput.current.value,
                    content: cntsInput.current.value,
                    date: dateInput.current.value,
                    writer : writerInput.current.value,
                },
                ...post,
            ];
            setMode("list");
            setPost(newPost);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fecthWrite();
    }

    

    return (
        <div className="boardWrite">
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <th>제목</th>
                            <td>
                                <input type="text" name="title" placeholder="제목" ref={titInput} />
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>
                                <textarea name="content" placeholder="내용" ref={cntsInput}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                날짜
                            </th>
                            <td>
                                <input type="text" name="date" placeholder="날짜" ref={dateInput} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="hidden" name="writer" value={currentUser.mail} hidden ref={writerInput} />
                <button type="button" onClick={() => setMode("list")}>목록</button>
                <button type="submit">작성완료</button>
            </form>
        </div>
    );
}
