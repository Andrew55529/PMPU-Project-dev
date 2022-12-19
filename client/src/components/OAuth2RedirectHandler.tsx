import React, {FC} from "react";
import { useSearchParams} from "react-router-dom";
import {useAction} from "../hooks/useAction";

const OAuth2RedirectHandler: FC = () => {
    let [searchParams] = useSearchParams();
    const code  =searchParams.get("code");
    const {loginGithub} = useAction();
    if (code) {
        console.log(code);
        loginGithub(code);
    }
    return (<div></div>);
};

export default OAuth2RedirectHandler;
