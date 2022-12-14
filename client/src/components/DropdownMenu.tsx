import React, {useEffect, useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";
import {ReactComponent as GithubIcon} from "../icons/github.svg";
import {ReactComponent as ArrowIcon} from "../icons/arraow.svg";
import {ReactComponent as ProfileIcon} from "../icons/profile.svg";
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
    goToMenu?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    link?: string;
    linkother?: string;
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

    const clientId = "d63b9e565cbef096b283";
    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;


    function DropdownItem(props: Test3) {
        if (props.link) {
            return (<Link to={props.link} className="menu-item">
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
            </Link>);
        }
        return (
            <a href={props.linkother ||"#"} className="menu-item" onClick={() => {props.goToMenu && setActiveMenu(props.goToMenu); props.onClick?.()}}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
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
                    <DropdownItem link="/profile" leftIcon={<ProfileIcon/>} >My Profile</DropdownItem>
                    {

                        // @ts-ignore
                        user["permission"].length !=0 &&
                            <DropdownItem

                                leftIcon={<SettingsIcon />}

                                goToMenu="settings">
                                Settings
                            </DropdownItem>
                    }

                    <DropdownItem
                        leftIcon={<SettingsIcon />}

                        goToMenu="user-settings">
                        User settings
                    </DropdownItem>
                    <DropdownItem onClick={() => logout()} leftIcon={<LogoutIcon />} >Logout</DropdownItem>

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
                        user["permission"].includes(1) &&
                        <DropdownItem link="/users" leftIcon={<ThemeLightDark />}>Users</DropdownItem>
                    }
                    {
                        // @ts-ignore
                        user["permission"].includes(2) &&
                        <DropdownItem link="/users/add" leftIcon={<ThemeLightDark />}>Add user</DropdownItem>
                    }
                    {
                        // @ts-ignore
                        user["permission"].includes(3) &&
                        <DropdownItem link="/doorslist" leftIcon={<ThemeLightDark />}>Doors list</DropdownItem>
                    }

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

                    <DropdownItem linkother={githubUrl} leftIcon={<GithubIcon />}>Connect Github</DropdownItem>

                </div>
            </CSSTransition>


        </div>
    );
}

export default DropdownMenu;