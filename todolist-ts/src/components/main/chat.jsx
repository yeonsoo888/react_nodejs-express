import React from "react";

function Chat() {
    return (
        <>
            <div className="btnChatWrap">
                <button className="btnChat">CHAT</button>
            </div>
            <div className="chatWrap">
                <div className="chat__inner">
                    <div className="chat__listWrap">
                        <ul className="chat__list">
                            <li className="onwer">
                                <div>
                                    <strong>이름</strong>
                                    <p>채팅내용</p>
                                    <span>2020.05.15 22:08</span>
                                </div>
                            </li>
                            <li className="admin">
                                <div>
                                    <strong>이름</strong>
                                    <p>채팅내용</p>
                                    <span>2020.05.15 22:08</span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <strong>이름</strong>
                                    <p>채팅내용</p>
                                    <span>2020.05.15 22:08</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <form>
                        <div className="chat__inputWrap">
                            <textarea name="" id=""></textarea>
                            <button>글쓰기</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Chat;
