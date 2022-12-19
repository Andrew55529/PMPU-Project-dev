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
            <ListBase>

                {
                    sessions.map(session => {
                        return (
                        <List ip={session.ip} ua={session.useragent} first_enter={session.first_enter} last_action={session.last_action} sessionId={session.auth_id}/>
                        )
                    })
                }


            </ListBase>

            <MainContainer>
                <EmptyContainer>
                    <PageLogo resizeMode="cover" source={require('../assets/logo.png')}/>
                    <PageTitle> Users</PageTitle>

                {
                        sessions.map(session => {
                            console.log(session);
                            return (
                                <>
                                    <div>
                                        <div>ICon</div>
                                        <div> Text</div>
                                    </div>
                                    <RegularText key={session.auth_id}>{session.ip}{session.useragent}{session.last_action}{session.first_enter}</RegularText >
                                    <Line key={"l"+session.auth_id}  />
                                </>
                                // <RegularText>{door.name}{door.local_door_id}</RegularText>
                            );
                        })

                    }
                </EmptyContainer>
            </MainContainer>
        </>
    );
};

export default ProfileScreen;