import axios from "axios";
import React, { useRef } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";

export default function Login({setIsLogin}) {
    const inputMail = useRef(null);
    const inputPw = useRef(null);
    const dispatch = useDispatch()

    const fetchLogin = async () =>  {
        let mailValue = inputMail.current.value;
        let pwValue = inputPw.current.value;

        await axios({
            method: 'post',
            credentials: 'include',
            url: "/login",
            data : {
                mail : mailValue,
                pw : pwValue
            },
        })
        .then((res) => {
            const token = res.data;
            localStorage.setItem("jwtToken",token);
            let userInfo = jwt_decode(token);
            dispatch({type: "loginMember",payload: {mail:userInfo.mail}});
        })
        .catch(err => {console.log(err)});
    };

    const handleLogin = () => {
        fetchLogin();
    }

    return (
        <>
            <div className="limit">
                <div className="subPage">
                    <h4 className="subTit">LOGIN</h4>
                    <div className="loginWrap">
                        <input type="text" placeholder="E-mail을 입력하세요" ref={inputMail} />
                        <input type="password" placeholder="비밀번호를 입력하세요" ref={inputPw} />
                        <button onClick={handleLogin}>로그인</button>
                    </div>
                </div>
            </div>
        </>
    );
}
