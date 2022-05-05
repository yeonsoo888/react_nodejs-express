import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Button , Form } from 'react-bootstrap';
import SubLayout from "./subLayout";
import { useHistory } from "react-router";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";



export default function Login({ changeAuth , confirmLogin, setLoginedUser, loginedUser}) {
    const history = useHistory(); 
    
    const [loginUser,setLoginUser] = useState(
        {
            mail: null,
            pw: null,
        }
    );

    const loginInputChange = (e) => {
        const { name , value } = e.currentTarget;
        const newLoginnUser = {...loginUser, [name] : value};
        setLoginUser(newLoginnUser);
    };

    const loginSubmit = () => {
        axios({
            method: 'post',
            credentials: 'include',
            url: "/login",
            data : {
                mail : loginUser.mail,
                pw : loginUser.pw
            },
        })
        .then((res) => {
            const token = res.data;
            localStorage.setItem("jwtToken",token);
            let userInfo = jwt_decode(token);
            history.push("/list");
            changeAuth();
            let currentUser = {...loginedUser, ["email"]: userInfo.mail};
            setLoginedUser(currentUser);
        })
        .catch((err) => {
            console.log(err);
        })
    };

    useEffect(() => {
        let nowToken = localStorage.getItem("jwtToken");
        if(nowToken == null) return;
        changeAuth();
        let userInfo = jwt_decode(nowToken);
        let currentUser = {...loginedUser, ["email"]: userInfo.mail};
        setLoginedUser(currentUser);
    },[]);

    return (
        <>
            <SubLayout name={"login"}>
                <Form>
                    <br />
                    <h4>로그인</h4>
                    <Form.Label>이메일</Form.Label>
                    <Form.Control placeholder="이메일" name="mail" onChange={loginInputChange} />
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control placeholder="비밀번호" name="pw" type="password" onChange={loginInputChange} />
                    <br />
                    <Button onClick={loginSubmit}>로그인</Button>
                </Form>
            </SubLayout>
        </>
    )
}