import React, {FC, useEffect} from 'react';
// import LoginForm from "./Screens/LoginForm";
// import Navbar from "./components/navbar"
// import NavItem from "./components/NavItems"
// import DropdownMenu from "./components/DropdownMenu"
// import {Context} from "./index";
import {observer} from "mobx-react-lite";
// import {IUser} from "./models/IUser";
// import UserService from "./services/UserService";
//



//
// import { RouterProvider,createBrowserRouter,Navigate,Outlet} from 'react-router-dom';


//
//
//
import AppRouter from "./components/AppRouter";
import {useAction} from "./hooks/useAction";
//
const App: FC = () => {

    const {setUser,setIsAuth,checkAuth} = useAction();
    useEffect(() => {
        if(localStorage.getItem('token')) {
            checkAuth();
            //setIsAuth(true);
        }
    }, [])

    return (
        <AppRouter />
    );

}

export default observer(App);

