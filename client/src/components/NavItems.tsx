import React, {useState} from "react";
import {Link} from "react-router-dom";

interface PersonProps1 {
    icon?: any;
    children?: React.ReactNode;
    link?: string;
}

function NavItem(props: PersonProps1) {
    const [open, setOpen] = useState(false);
    if (props.link) {
        return (<li className="nav-item"><Link to={props.link} className="icon-button">{props.icon}</Link></li>);
    }
    return (
        <li className="nav-item">

            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>
            {open && props.children}
        </li>
    );
}

export default NavItem;