import React from 'react'
// import axios from 'axios';
import {Button , Form } from 'react-bootstrap';
import SubLayout from "./subLayout";

function Login() {
    return (
        <>
            <SubLayout name={"login"}>
                <Form>
                    <Form.Label>이메일</Form.Label>
                    <Form.Control placeholder="제목을 입력하세요" name="title" />
                    <Form.Label>이름</Form.Label>
                    <Form.Control placeholder="날짜 입력하세요" name="date" />
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control placeholder="날짜 입력하세요" name="date" />
                    <Button>회원가입</Button>
                    <Form.Label>이메일</Form.Label>
                    <Form.Control placeholder="제목을 입력하세요" name="title" />
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control placeholder="날짜 입력하세요" name="date" />
                    <Button>로그인</Button>
                </Form>
            </SubLayout>
        </>
    )
}

export default Login