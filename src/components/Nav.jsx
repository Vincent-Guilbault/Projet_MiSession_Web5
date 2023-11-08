import React from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = ({ links }) => {
    let location = useLocation();

    return (
        <nav>
            <ul className="nav">
                {links.map(({name, url}) => (
                    <li key={name} className={url === location.pathname ? "active" : ""}>
                        <Link to={url} className="nav-link" data-cy={"btn_"+name}>{name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Nav;