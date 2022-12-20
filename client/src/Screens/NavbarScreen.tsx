import React from 'react';
import Navbar from "../components/navbar";
import NavItem from "../components/NavItems";
import {ReactComponent as DoorIcon} from "../icons/door.svg";
import {ReactComponent as CarrotIcon} from "../icons/carrot.svg";
import DropdownMenu from "../components/DropdownMenu";
import "./NavScreen.css";
const NavbarScreen = () => {
    return (
        <div>
            <Navbar>

                <NavItem link="/doors" icon={<DoorIcon />} />
                <NavItem icon={<CarrotIcon />}>
                    <DropdownMenu />
                </NavItem>
            </Navbar>
        </div>
    );
};

export default NavbarScreen;