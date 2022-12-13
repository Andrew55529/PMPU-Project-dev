import React, {FC, useEffect} from "react";
import {Line, PageLogo, PageTitle} from "../components/styles";
import EmptyContainer from "../components/Containers/EmptyContainer";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useAction} from "../hooks/useAction";
import MainContainer from "../components/Containers/MainContainer";
import RegularText from "../components/Text/RegularRext";
import RegularButton from "../components/Buttons/RegularButton";
import DoorsService from "../services/DoorsService";
import $api from "../http";
import {DoorResponse} from "../models/response/DoorsResponse";
import {UsersResponse} from "../models/response/UsersResponse";


const UsersScreen: FC = () => {
    // const {isAuth, isLoading} = useTypedSelector(state => state.auth);
    const {users} = useTypedSelector(state => state.data);
    // useEffect(() => {
    //     console.log(isAuth,isLoading);
    //     console.log("123",doors);
    // }, [])
    //
    const {getUsers} = useAction();
    useEffect(() => {
        getUsers();
    }, [])



    return (
        <MainContainer>
            <EmptyContainer>
                <PageLogo resizeMode="cover" source={require('../assets/logo.png')}/>
                <PageTitle> Users</PageTitle>
                {
                    users.map(user => {
                        console.log(user);
                        return (
                            <>
                                <RegularText key={user.user_id}>{user.name}</RegularText >
                                <Line key={"l"+user.user_id}  />
                            </>
                            // <RegularText>{door.name}{door.local_door_id}</RegularText>
                        );
                    })

                }
            </EmptyContainer>
        </MainContainer>
    );
};

export default UsersScreen;