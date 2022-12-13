import React, {useEffect, useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";
import {ReactComponent as ChevronIcon} from "../icons/chevron.svg";
import {ReactComponent as ArrowIcon} from "../icons/arraow.svg";
import {ReactComponent as BoltIcon} from "../icons/bolt.svg";
import {ReactComponent as ThemeLightDark} from "../icons/ThemeLightDark.svg";
import {ReactComponent as SettingsIcon} from "../icons/settings.svg";
import {ReactComponent as LogoutIcon} from "../icons/logout.svg";
import {useAction} from "../hooks/useAction";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {  Link } from "react-router-dom"

interface PersonProps1 {
    icon?: any;
    children?: React.ReactNode;
}




interface Test3 {
    leftIcon?: any;
    rightIcon?: any;
    goToMenu?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}


function DropdownMenu(props: PersonProps1) {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null as any);
    const dropdownRef = useRef(null as any);

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild?.offsetHeight)
    }, [])

    function calcHeight(el: any) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    function DropdownItem(props: Test3) {
        return (
            <a href="#" className="menu-item" onClick={() => {props.goToMenu && setActiveMenu(props.goToMenu); props.onClick?.()}}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        );
    }
    const {logout} = useAction();

    const {user} = useTypedSelector(state => state.auth);

    return (
        <div className="dropdown" style={{ height: menuHeight}} ref={dropdownRef}>

            <CSSTransition
                in={activeMenu === 'main'}
                timeout={500}
                classNames="menu-primary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem>My Profile</DropdownItem>
                    <DropdownItem
                        leftIcon={<SettingsIcon />}
                        rightIcon={<ChevronIcon />}
                        goToMenu="settings">
                        Settings
                    </DropdownItem>
                    <DropdownItem
                        leftIcon={<SettingsIcon />}
                        rightIcon={<ChevronIcon />}
                        goToMenu="user-settings">
                        User settings
                    </DropdownItem>
                    <DropdownItem onClick={() => logout()} leftIcon={<LogoutIcon />} rightIcon={<ChevronIcon />}>Logout</DropdownItem>

                </div>
            </CSSTransition>
            <CSSTransition
                in={activeMenu === 'settings'}
                timeout={500}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                        <h2>Back</h2>
                    </DropdownItem>
                    {
                        // @ts-ignore
                        user["permission"].includes(2) &&
                        <Link to="/users"><DropdownItem leftIcon={<ThemeLightDark />}>Users</DropdownItem></Link>
                    }

                    <DropdownItem leftIcon={<BoltIcon />}>Add user</DropdownItem>
                    <DropdownItem leftIcon={<BoltIcon />}>Logs</DropdownItem>

                </div>
            </CSSTransition>
            <CSSTransition
                in={activeMenu === 'user-settings'}
                timeout={500}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                        <h2>Back</h2>
                    </DropdownItem>
                    <DropdownItem leftIcon={<ThemeLightDark />}>Theme</DropdownItem>

                </div>
            </CSSTransition>


        </div>
    );
}

export default DropdownMenu;