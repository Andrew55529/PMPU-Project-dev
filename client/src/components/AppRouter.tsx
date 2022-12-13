import React from 'react';
import {Routes,Route,Navigate} from 'react-router-dom';
import DoorsScreen from "../Screens/DoorsScreen";
import NavbarScreen from "../Screens/NavbarScreen";
import LoginForm from "../Screens/LoginForm";
import {useTypedSelector} from "../hooks/useTypedSelector";
import Empty2 from "../Screens/Empty2";
import UsersScreen from "../Screens/UsersScreen";

const AppRouter = () => {
    const {isAuth, isLoading,user} = useTypedSelector(state => state.auth);
    return (
        !isLoading
            ?
            isAuth
                ?
                <React.Fragment>
                    <NavbarScreen />
                    <Routes>
                        <Route path="/doors" element={<DoorsScreen/>}/>
                        <Route path="/users" element={<UsersScreen/>}/>
                        <Route path="*" element={<Navigate to="doors" />} />
                    </Routes>
                </React.Fragment>
                :
                <Routes>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="*" element={<Navigate to="login" />} />
                </Routes>
            :
            <Empty2 />
    );
};

export default AppRouter;

