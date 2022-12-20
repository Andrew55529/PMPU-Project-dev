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
import Modal from "../components/Modal/Modal";
import StyledTextInput2 from "../components/Inputs/StyledTextInput";
import {ReactComponent as LogoutIcon} from "../icons/logout.svg";
import {colors} from "../components/colors";
import Toggle from "../components/Toggle/Toggle";
import Loading from "../components/Loading";


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


    const [modalActive, setModalActive] = useState(false);
    const [email,setEmail] = useState<string>("");
    const [login,setLogin] = useState<string>("");
    const {brand,green} = colors;

    return (
        <MainContainer>
            <EmptyContainer>


                <Modal active={modalActive} setActive={setModalActive}>
                    <Loading/>
                    <PageTitle>Редактирование пользователя</PageTitle>
                    <Line/>
                    <StyledTextInput2 label="Логин" value={login} onChangeText={setLogin} placeholder="login123" keyboardType="email-address" style={{marginBottom:10}} icon={<LogoutIcon color={brand} />}/>
                    <StyledTextInput2 label="Почта" value={email} onChangeText={setEmail} placeholder="email@email.com" keyboardType="email-address" style={{marginBottom:10}} icon={<LogoutIcon color={brand} />}/>
                    <div style={{display: "grid"}}>
                        <Toggle name="Дверь 1"/>
                        <Toggle name="Дверь 2"/>
                        <Toggle name="Дверь 3"/>
                    </div>
                </Modal>


                <PageTitle> Users</PageTitle>
                <ListBase>
                    {
                        users.map(user => {
                            return (
                                <ListUsers name={user.name} email={user.email} onoff={user.onoff}  user_id={user.user_id} onBtn={() => setModalActive(true)}/>
                            )
                        })
                    }
                </ListBase>

            </EmptyContainer>
        </MainContainer>
    );
};

export default UsersScreen;