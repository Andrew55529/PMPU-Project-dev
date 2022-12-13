import React from 'react';
import Navbar from "../components/navbar";
import NavItem from "../components/NavItems";
import {ReactComponent as PlusIcon} from "../icons/plus.svg";
import {ReactComponent as BellIcon} from "../icons/bell.svg";
import {ReactComponent as CarrotIcon} from "../icons/carrot.svg";
import DropdownMenu from "../components/DropdownMenu";
import "./NavScreen.css";
import {Link} from "react-router-dom";
const NavbarScreen = () => {
    return (
        <div>
            <Navbar>
                <NavItem icon={<PlusIcon />} />
                <Link to="/doors"><NavItem icon={<BellIcon />} /></Link>
                <NavItem icon={<CarrotIcon />}>
                    <DropdownMenu />
                </NavItem>
            </Navbar>
        </div>
    );
};

export default NavbarScreen;