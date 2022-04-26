import React, {useState,useEffect,useRef} from "react";
import axios from 'axios';
import {Button , Form } from 'react-bootstrap';
import SubLayout from "./subLayout";

export default function Board({data}) {
    const input = useRef(null);
    const textarea = useRef(null);

    const [posts, setPosts] = useState([]);
    const [newPost,setNewPost] = useState({
        title: "",
        date: "",
    });


    useEffect(() => {
        setPosts(data);
    },[])
    
    
    const handleChange = (e) => {
        const {value,name} = e.currentTarget;
        setNewPost({...newPost,[name]:value});
    }

    const handleSubmit = () => {
        const inputVal = newPost.title;
        const textareaVal = newPost.date;
        console.log(inputVal);
        console.log(textareaVal);
        
        const newPosts = [newPost,...posts];
        setPosts(newPosts);

        axios({
            method: 'post',
            url: '/add',
            data: {
                title: inputVal,
                date: textareaVal,
            }
        })
        .then((res) => {
            console.log(res);
        })
    }



    return (
        <>
            <SubLayout name={"board"}>
                <div className="inner">
                    <Form>
                        <div className="inputBox">
                            <Form.Label>제목</Form.Label>
                            <Form.Control placeholder="제목을 입력하세요" name="title" value={newPost.title} onChange={handleChange} ref={input} />
                            <Form.Label>날짜</Form.Label>
                            <Form.Control placeholder="날짜 입력하세요" name="date" value={newPost.date} onChange={handleChange} ref={textarea} />
                            <Button type="reset">cancel</Button>
                            <Button onClick={handleSubmit}>create</Button>
                        </div>
                    </Form>
                    <div className="showBox">
                        {posts.map( (item,i) => {
                            
                            return (
                                <article key={i}>
                                    <h2>{item.title}</h2>
                                    <p>{item.date}</p>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </SubLayout>
        </>
    );
}
