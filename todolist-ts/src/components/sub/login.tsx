import React, { useRef } from "react";

export default function Login() {
    const mailVal = useRef(null);
    const pwVal = useRef(null);

    const handleLogin = () => {
        
    }


    return (
        <>
            <div className="limit">
                <div className="subPage">
                    <h4 className="subTit">LOGIN</h4>
                    <div className="loginWrap">
                        <input type="text" placeholder="E-mail을 입력하세요" ref={mailVal} />
                        <input type="text" placeholder="비밀번호를 입력하세요" ref={pwVal} />
                        <button onClick={handleLogin}>로그인</button>
                    </div>
                </div>
            </div>
        </>
    );
}
