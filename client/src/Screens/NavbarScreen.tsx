import React from 'react';
import Navbar from "../components/navbar";
import NavItem from "../components/NavItems";
import {ReactComponent as PlusIcon} from "../icons/plus.svg";
import {ReactComponent as BellIcon} from "../icons/bell.svg";
import {ReactComponent as CarrotIcon} from "../icons/carrot.svg";
import DropdownMenu from "../components/DropdownMenu";
import "./NavScreen.css";
const NavbarScreen = () => {
    return (
        <div>
            <Navbar>
                <NavItem icon={<PlusIcon />} />
                <NavItem icon={<BellIcon />} />
                <NavItem icon={<CarrotIcon />}>
                    <DropdownMenu />
                </NavItem>
            </Navbar>
        </div>
    );
};

export default NavbarScreen;