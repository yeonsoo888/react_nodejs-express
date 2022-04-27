import React, { useState } from 'react'
// import axios from 'axios';
import {Button , Form } from 'react-bootstrap';
import SubLayout from "./subLayout";

export default function Login() {

    const [joinUser,setJoinUser] = useState(
        {
            mail: null,
            name: null,
            pw: null,
        }
    );
    
    const [loginUser,setLoginUser] = useState(
        {
            name: null,
            pw: null,
        }
    );

    const joinInputChange = (e) => {
        const { name , value } = e.currentTarget;
        const newJoinUser = {...joinUser, [name] : value};
        setJoinUser(newJoinUser);
    };
    
    const loginInputChange = (e) => {
        const { name , value } = e.currentTarget;
        const newLoginnUser = {...loginUser, [name] : value};
        setLoginUser(newLoginnUser);
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
                    <Button>회원가입</Button>
                    <br />
                    <br />
                    <br />
                    <h4>로그인</h4>
                    <Form.Label>이메일</Form.Label>
                    <Form.Control placeholder="이메일" name="mail" onChange={loginInputChange} />
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control placeholder="비밀번호" name="pw" type="password" onChange={loginInputChange} />
                    <br />
                    <Button>로그인</Button>
                </Form>
            </SubLayout>
        </>
    )
}