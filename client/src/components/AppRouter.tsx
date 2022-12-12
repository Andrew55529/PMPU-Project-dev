import React from 'react';
import {Routes,Route,Navigate} from 'react-router-dom';
import Empty from "../Screens/Empty";
import NavbarScreen from "../Screens/NavbarScreen";
import LoginForm from "../Screens/LoginForm";
import {useTypedSelector} from "../hooks/useTypedSelector";

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
                        <Route path="/doors" element={<Empty/>}/>
                        <Route path="*" element={<Navigate to="doors" />} />
                    </Routes>
                </React.Fragment>
                :
                <Routes>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="*" element={<Navigate to="login" />} />
                </Routes>
            :
            <Empty />
    );
};

export default AppRouter;

