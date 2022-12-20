import React, {FC, useEffect, useState} from "react";
import {Line, MsgBox, PageLogo, PageTitle, SubTitles} from "../components/styles";
import EmptyContainer from "../components/Containers/EmptyContainer";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useAction} from "../hooks/useAction";
import MainContainer from "../components/Containers/MainContainer";
import RegularText from "../components/Text/RegularRext";
import RegularButton from "../components/Buttons/RegularButton";
import StyledTextInput2 from "../components/Inputs/StyledTextInput";
import {ReactComponent as LogoutIcon} from "../icons/logout.svg";
import {colors} from "../components/colors";
import UserService from "../services/UserService";
import Loading from "../components/Loading";
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
    const [msg,setMsg] = useState<string>("");
    const [timerId,setTimerId] = useState<NodeJS.Timeout>();
    const [isLoading,setIsLoading] = useState<boolean>(false );

    function submit(login: string, email: string) {
        setIsLoading(true);
        setMsg("");
        UserService.addUser(login, email).then((result) =>
        {;setIsLoading(false); clearTimeout(timerId); setMsg("Пользователь успешно добавлен"); setTimerId(setTimeout(()=> setMsg(""),4000)); },
                error =>
        {;setIsLoading(false); clearTimeout(timerId); setMsg(error.response.data.message); setTimerId(setTimeout(()=> setMsg(""),4000))});
    }

    return (
        <>
            {isLoading ? <Loading/>: <></>}
        <MainContainer>

            <EmptyContainer>

                <PageTitle>Добавление пользователя</PageTitle>
                {/*ФОрма*/}
                <StyledTextInput2 label="Почта" value={email} onChangeText={setEmail} placeholder="email@email.com" keyboardType="email-address" style={{marginBottom:10}} icon={<LogoutIcon color={brand} />}/>
                <StyledTextInput2 label="Логин" value={login} onChangeText={setLogin} placeholder="login123" keyboardType="email-address" style={{marginBottom:10}} icon={<LogoutIcon color={brand} />}/>
                { msg != "" && <MsgBox><SubTitles>{msg}</SubTitles></MsgBox> }
                <RegularButton onPress={() => {submit(login,email);}}><RegularText >Добавить пользователя</RegularText ></RegularButton>


            </EmptyContainer>
        </MainContainer>

        </>
    );
};

export default AddUserScreen;