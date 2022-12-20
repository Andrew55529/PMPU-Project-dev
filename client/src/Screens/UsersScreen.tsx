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
import ListBase from "../components/List/ListBase";
import List from "../components/List/List";
import ListUsers from "../components/List/ListUsers";


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

                <PageTitle> Users</PageTitle>
                <ListBase>
                    {
                        users.map(user => {
                            return (
                                <ListUsers name={user.name} email={user.email} onoff={user.onoff}  user_id={user.user_id}/>
                            )
                        })
                    }
                </ListBase>

            </EmptyContainer>
        </MainContainer>
    );
};

export default UsersScreen;