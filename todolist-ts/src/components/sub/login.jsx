import axios from "axios";
import React, { useRef , useState } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";

export default function Login({setIsLogin}) {
    const inputMail = useRef(null);
    const inputPw = useRef(null);
    const dispatch = useDispatch()
    const [confirmId,setConfirmId] = useState(false);

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
            console.log(res)
            const token = res.data;
            localStorage.setItem("jwtToken",token);
            let userInfo = jwt_decode(token);
            dispatch({type: "loginMember",payload: {mail:userInfo.mail}});
        })
        .catch(err => {
            setConfirmId(true);
            setTimeout(() => {
                setConfirmId(false);
            },2000);
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        fetchLogin();
    }

    return (
        <>
            <div className="limit">
                <div className="subPage">
                    <h4 className="subTit">LOGIN</h4>
                    <div className="loginWrap">
                        <form onSubmit={handleLogin} >
                            <input type="text" placeholder="E-mail을 입력하세요" ref={inputMail} />
                            <input type="password" placeholder="비밀번호를 입력하세요" ref={inputPw} />
                            <button type="submit">로그인</button>
                            {
                                confirmId && <p>ID , PASSWORD를 확인해주세요</p>
                            }
                        </form>
                        <p>TEST ID : test@test.com</p>
                        <p>TEST PW : test</p>
                    </div>
                </div>
            </div>
        </>
    );
}
