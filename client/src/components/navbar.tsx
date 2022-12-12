import React from "react";

interface OnlyChildren {
    children?: React.ReactNode;
}

function Navbar(props: OnlyChildren) {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">{props.children}</ul>
        </nav>
    );
}

export default Navbar;