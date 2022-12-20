import React, {FC, useEffect} from "react";
import {Line, PageLogo, PageTitle} from "../components/styles";
import EmptyContainer from "../components/Containers/EmptyContainer";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useAction} from "../hooks/useAction";
import MainContainer from "../components/Containers/MainContainer";
import RegularText from "../components/Text/RegularRext";
import List from "../components/List/List";
import ListBase from "../components/List/ListBase";


const ProfileScreen: FC = () => {
    // const {isAuth, isLoading} = useTypedSelector(state => state.auth);
    const {sessions} = useTypedSelector(state => state.data);
    // useEffect(() => {
    //     console.log(isAuth,isLoading);
    //     console.log("123",doors);
    // }, [])
    //
    const {getSessions} = useAction();
    useEffect(() => {
        getSessions();
    }, [])

    console.log(sessions);


    return (
        <>
            <MainContainer>
                <PageTitle>Session list</PageTitle>
                <ListBase>
                    {
                        sessions.map(session => {
                            return (
                                <List key={session.auth_id} ip={session.ip} ua={session.useragent} first_enter={session.first_enter} last_action={session.last_action} sessionId={session.auth_id}/>
                            )
                        })
                    }
                </ListBase>
            </MainContainer>
        </>
    );
};

export default ProfileScreen;