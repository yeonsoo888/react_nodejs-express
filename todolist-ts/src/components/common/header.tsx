import React from "react";
import { Link } from 'react-router-dom';


function Header() {
    return (
        <header className='header'>
            <div className="limit">
                <nav className="nav">
                    <h1 className="logo">
                        <Link to='/'><span>LOGO</span></Link>
                    </h1>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
