import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
function Header() {
    const currentMember = useSelector(store => store.memberReducer.member);
    const dispatch = useDispatch()
    const history = useHistory(); 
    return (
        <header className='header'>
            <div className="limit">
                <h1 className="logo">
                    <Link to='/'><span>LOGO</span></Link>
                </h1>
                <nav className="nav">
                    <ul className="navList">
                        <li><Link to='list'><span>LIST</span></Link></li>
                        <li><Link to='youtube'><span>YOUTUBE</span></Link></li>
                    </ul>
                </nav>
                {
                    currentMember.mail !== undefined &&
                    <button onClick={() => {
                        dispatch({type:"logoutMember"});
                        localStorage.removeItem("jwtToken");
                        history.push("/");
                    }}>로그아웃
                    </button>
                }
            </div>
        </header>
    );
}

export default Header;
