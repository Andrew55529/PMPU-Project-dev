import React, {FC} from "react";
import {Navigate, useSearchParams} from "react-router-dom";
import {useAction} from "../hooks/useAction";
import {useTypedSelector} from "../hooks/useTypedSelector";

const OAuth2RedirectHandler: FC = () => {
    let [searchParams] = useSearchParams();
    const code  =searchParams.get("code");
    const {loginGithub,connectGithub} = useAction();

    const {isAuth} = useTypedSelector(state => state.auth);
    if (code) {
        console.log(code);
        console.log("AUTH" + isAuth);
        if (localStorage.getItem('token'))  {
            console.log("AUTH" + isAuth);
            connectGithub(code)
            return (<Navigate to="/doors" />);
        }else {
            try {
                loginGithub(code);
            } catch (e) {
                console.log("NAVIGATE TO LOGIN")

             console.log("123")
            }
        }
    }
    console.log("HMMMMS")
    return (<Navigate to="/login" />);
};

export default OAuth2RedirectHandler;
