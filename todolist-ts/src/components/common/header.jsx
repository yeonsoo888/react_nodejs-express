import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
function Header() {
    const {member} = useSelector(store => store.memberReducer);
    const dispatch = useDispatch()
    const history = useHistory(); 
    return (
        <>
            <header className='header'>
                <div className="limit">
                    <h1 className="logo">
                        <Link to='/'><span>HOME</span></Link>
                    </h1>
                    {
                        member.mail !== undefined &&
                        <>
                            <nav className="nav">
                                <ul className="navList">
                                    <li><Link to='/board'><span>BOARD</span></Link></li>
                                    <li><Link to='/youtube'><span>YOUTUBE</span></Link></li>
                                    {
                                        member.level === "admin" 
                                        ? <li><Link to='/chatroom'><span>CHAT ROOM</span></Link></li>
                                        : null
                                    }
                                </ul>
                            </nav>
                            <button onClick={() => {
                                dispatch({type:"logoutMember"});
                                localStorage.removeItem("jwtToken");
                                history.push("/");
                            }}>๋ก๊ทธ์์
                            </button>
                        </>
                    }
                </div>
            </header>
        </>
    );
}

export default Header;
