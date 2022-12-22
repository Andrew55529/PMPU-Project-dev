import React from 'react';
import {Routes,Route,Navigate} from 'react-router-dom';
import DoorsScreen from "../Screens/DoorsScreen";
import NavbarScreen from "../Screens/NavbarScreen";
import LoginForm from "../Screens/LoginForm";
import {useTypedSelector} from "../hooks/useTypedSelector";
import Empty2 from "../Screens/Empty2";
import UsersScreen from "../Screens/UsersScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import OAuth2RedirectHandler from "./OAuth2RedirectHandler";
import AddUserScreen from "../Screens/AddUserScreen";
import DoorsListScreen from "../Screens/DoorsList";

const AppRouter = () => {
    const {isAuth, isLoading} = useTypedSelector(state => state.auth);
    return (
        !isLoading
            ?
            isAuth
                ?
                <React.Fragment>
                    <NavbarScreen />
                    <Routes>
                        <Route path="/profile" element={<ProfileScreen/>}/>
                        <Route path="/doors" element={<DoorsScreen/>}/>
                        <Route path="/users" element={<UsersScreen/>}/>
                        <Route path="/doorslist" element={<DoorsListScreen/>}/>
                        <Route path="/users/add" element={<AddUserScreen/>}/>
                        <Route path="*" element={<Navigate to="doors" />} />
                    </Routes>
                </React.Fragment>
                :
                <Routes>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
                    <Route path="*" element={<Navigate to="login" />} />
                </Routes>
            :
            <Empty2 />
    );
};

export default AppRouter;

