import React , {useState} from "react";
import axios from "axios";

function View({selectPost,setMode,post,setPost}) {
    const handleDelete = () => {
        fetchRemove();
    }

    const handleModify = () => {
        setMode("modify");
    }

    const fetchRemove = async () => {
        await axios({
            method : 'delete',
            credentials: 'include',
            url: '/delete',
            data: {
                _id: selectPost._id
            }
        }).then(res => {
            const removalItemId = res.data.targetId
            setPost(() => {
                return post.filter(item => item._id !== removalItemId);
            });
            setMode("list");
        }).catch(err => {
            console.log(err);
        })
    }

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
                <button onClick={()=> {handleModify()}}>수정</button>
                <button onClick={handleDelete}>삭제</button>
            </div>
        </div>
    );
}

export default View;
