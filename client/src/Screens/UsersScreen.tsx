import React, {FC, useEffect, useState} from "react";
import {Line, PageTitle} from "../components/styles";
import EmptyContainer from "../components/Containers/EmptyContainer";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useAction} from "../hooks/useAction";
import MainContainer from "../components/Containers/MainContainer";
import RegularText from "../components/Text/RegularRext";
import RegularButton from "../components/Buttons/RegularButton";

import {DoorResponse} from "../models/response/DoorsResponse";
import ListBase from "../components/List/ListBase";
import ListUsers from "../components/List/ListUsers";
import Modal from "../components/Modal/Modal";
import StyledTextInput2 from "../components/Inputs/StyledTextInput";
import {ReactComponent as LogoutIcon} from "../icons/logout.svg";
import {colors} from "../components/colors";
import Toggle from "../components/Toggle/Toggle";
import Loading from "../components/Loading";
import UserService from "../services/UserService";
import {Simulate} from "react-dom/test-utils";
import {UserResponse} from "../models/response/UserDataResponse";


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

    const [userAll,setUserAll] = useState<UserResponse>();
    const [isLoading,setIsLoading] = useState<boolean>(true);

    const [allDoors,setAllDoors] = useState<DoorResponse[]>();

    useEffect(() => {
        UserService.getAllDoors().then(result => {// @ts-ignore
            setAllDoors(result.data); setIsLoading(false);} ,error => {console.log(error)} )
    },[]);

    function getUserinfo(userId: number) {
        UserService.getUser(userId).then(result => { // @ts-ignore
            setUserAll(result.data); setIsLoading(false);} ,error => {console.log(error)} )

    }

    function getDoorNameByID(id: number) {

        // @ts-ignore
        let obj = allDoors.find(o => o.local_door_id === id);
        // return "123";
        // @ts-ignore
        return obj["name"];
    }


    return (
        <MainContainer>
            <EmptyContainer>


                <Modal active={modalActive} setActive={setModalActive}>
                    {isLoading ? <Loading/> : <></>}
                    <PageTitle>Редактирование пользователя</PageTitle>
                    <Line/>
                    <StyledTextInput2 label="Логин" value={userAll?.user.name} onChangeText={setLogin} placeholder="login123" keyboardType="email-address" style={{marginBottom:10}} icon={<LogoutIcon color={brand} />}/>
                    <StyledTextInput2 label="Почта" value={userAll?.user.email} onChangeText={setEmail} placeholder="email@email.com" keyboardType="email-address" style={{marginBottom:10}} icon={<LogoutIcon color={brand} />}/>
                    <div style={{display: "grid"}}>

                            {
                                // console.log(userAll);
                                allDoors?.map(door => { // @ts-ignore
                                    let tmpBool=false;
                                    let tmp = userAll?.doors.find(o => o.local_door_id === door.local_door_id);
                                    if (tmp) tmpBool=true;
                                return (<Toggle key={ door.local_door_id} name={ getDoorNameByID(door.local_door_id)} checked={tmpBool}/>);})
                            }
                    </div>
                    <RegularButton onPress={() => {console.log("Удалить");}}><RegularText >Удалить пользователя</RegularText ></RegularButton>

                </Modal>


                <PageTitle> Users</PageTitle>
                <ListBase>
                    {
                        users.map(user => {
                            return (
                                <ListUsers key={user.user_id } name={user.name} email={user.email} onoff={user.onoff}  user_id={user.user_id} onBtn={() => {setModalActive(true); getUserinfo(user.user_id);}}/>
                            )
                        })
                    }
                </ListBase>
                <RegularButton onPress={() => {getDoorNameByID(5);}}><RegularText >Добавить пользователя</RegularText ></RegularButton>

            </EmptyContainer>
        </MainContainer>
    );
};

export default UsersScreen;