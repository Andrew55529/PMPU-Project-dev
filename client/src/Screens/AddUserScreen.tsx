import React, {FC, useEffect, useState} from "react";
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
import StyledTextInput2 from "../components/Inputs/StyledTextInput";
import {ReactComponent as LogoutIcon} from "../icons/logout.svg";
import {colors} from "../components/colors";

const {brand,green} = colors;
const AddUserScreen: FC = () => {
    // const {isAuth, isLoading} = useTypedSelector(state => state.auth);
    const {users} = useTypedSelector(state => state.data);
    // useEffect(() => {
    //     console.log(isAuth,isLoading);
    //     console.log("123",doors);
    // }, [])
    //
    // const {getUsers} = useAction();
    // useEffect(() => {
    //     getUsers();
    // }, [])
    const [email,setEmail] = useState<string>("");
    const [login,setLogin] = useState<string>("");


    return (
        <MainContainer>
            <EmptyContainer>

                <PageTitle>Add user</PageTitle>
                {/*ФОрма*/}
                <StyledTextInput2 label="Email" value={email} onChangeText={setEmail} placeholder="email@email.com" keyboardType="email-address" style={{marginBottom:10}} icon={<LogoutIcon color={brand} />}/>
                <StyledTextInput2 label="Login" value={login} onChangeText={setLogin} placeholder="login123" keyboardType="email-address" style={{marginBottom:10}} icon={<LogoutIcon color={brand} />}/>
                <RegularButton onPress={() => {console.log("123");}}><RegularText >Press m1e</RegularText ></RegularButton>
                <Line />

            </EmptyContainer>
        </MainContainer>
    );
};

export default AddUserScreen;