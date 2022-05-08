import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import store from "../../redux/store";
function Header() {
    const currentMember = useSelector(store => store.memberReducer.member);
    const dispatch = useDispatch()
    const history = useHistory(); 
    return (
        <header className='header'>
            <div className="limit">
                <nav className="nav">
                    <h1 className="logo">
                        <Link to='/'><span>LOGO</span></Link>
                    </h1>
                    <ul className="navList">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        {
                            currentMember.mail !== undefined &&
                            <li><button onClick={() => {
                                dispatch({type:"logoutMember"});
                                localStorage.removeItem("jwtToken");
                                history.push("/");
                            }}>로그아웃</button></li>
                        }
                    </ul>
                    
                </nav>
            </div>
        </header>
    );
}

export default Header;
