import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Button , Form } from 'react-bootstrap';
import SubLayout from "./subLayout";
import { useHistory } from "react-router";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";



export default function Login({ changeAuth , confirmLogin}) {
    const history = useHistory();
    const [joinUser,setJoinUser] = useState(
        {
            mail: null,
            name: null,
            pw: null,
        }
    );
    
    const [loginUser,setLoginUser] = useState(
        {
            mail: null,
            pw: null,
        }
    );

    const joinInputChange = (e) => {
        const { name , value } = e.currentTarget;
        const newJoinUser = {...joinUser, [name] : value};
        setJoinUser(newJoinUser);
    };

    const joinSubmit = () => {
        axios({
            method: 'post',
            url: "join",
            data : {
                mail : joinUser.mail,
                name : joinUser.name,
                pw : joinUser.pw
            }
        })
        .then((res) => {
            console.log(res);
            history.push("/");
        })

        .catch((err) => {
            console.log(err);
        })
    }
    
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
            console.log(jwt_decode(token));
        })
        .catch((err) => {
            console.log(err);
        })
    };




    return (
        <>
            <SubLayout name={"login"}>
                <Form>
                    <h4>회원가입</h4>
                    <Form.Label>이메일</Form.Label>
                    <Form.Control placeholder="이메일" name="mail" onChange={joinInputChange} />
                    <Form.Label>이름</Form.Label>
                    <Form.Control placeholder="이름" name="name" onChange={joinInputChange} />
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control placeholder="비밀번호" type="password" name="pw" onChange={joinInputChange} />
                    <br />
                    <Button type="button" onClick={joinSubmit}>회원가입</Button>
                    <br />
                    <br />
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