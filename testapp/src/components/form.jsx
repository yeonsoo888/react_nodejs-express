import React, {useState,useEffect,useRef} from "react";
import axios from 'axios';


export default function Form({data}) {
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
            <form>

            </form>
            <div className="inputBox">
                <input type="text" placeholder="제목을 입력하세요" name="title" value={newPost.title} onChange={handleChange} ref={input} /> <br />
                <textarea placeholder="본문을 입력하세요" name="date" value={newPost.date} onChange={handleChange} ref={textarea}></textarea> <br />
                <button type="reset">cancel</button>
                <button onClick={handleSubmit}>create</button>
            </div>
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
        </>
    );
}
