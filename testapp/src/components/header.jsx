import React from "react";
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="header">
            <div className="inner">
                <nav className="nav">
                    <ul className="navList">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/write">Write</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
