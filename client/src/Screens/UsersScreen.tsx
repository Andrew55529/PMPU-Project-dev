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
import {UserResponse, USerTemp} from "../models/response/UserDataResponse";
import {PermissionResponse} from "../models/response/PermissionsRespone";


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

    const {brand} = colors;

    const [userAll,setUserAll] = useState<UserResponse>();
    const [isLoading,setIsLoading] = useState<boolean>(true);

    const [allDoors,setAllDoors] = useState<DoorResponse[]>();
    const [allPerm,setAllPerm] = useState<PermissionResponse[]>();

    const [email,setEmail] = useState<string>("");
    const [login,setLogin] = useState<string>("");
    const [check, setCheck] = useState<number[]>([]);
    const [perm, setPerm] = useState<number[]>([]);
    const [onoff, setOnoff] = useState<boolean>(false);

    useEffect(() => {
        UserService.getAllDoors().then(result => {// @ts-ignore
            setAllDoors(result.data); setIsLoading(false);} ,error => {console.log(error)} )
    },[]);
    useEffect(() => {
        UserService.getAllPerm().then(result => {// @ts-ignore
            setAllPerm(result.data); setIsLoading(false);} ,error => {console.log(error)} )
    },[]);

    function getUserinfo(userId: number) {
        UserService.getUser(userId).then(result => {
            setUserAll(result.data);
            setEmail(result.data.user.email)
            setLogin(result.data.user.name);
            setOnoff(result.data.user.onoff);
            let tmp:number[]=[];
            result.data.doors.map(door => {tmp=[...tmp,door.local_door_id];})
            setCheck(tmp);

            let tmp1:number[]=[];
            result.data.permission.map(perma => {tmp1=[...tmp1,perma.perm_name_id];})
            setPerm(tmp1);

            setIsLoading(false);} ,error => {console.log(error)} )

    }


    function getDoorNameByID(id: number) {
        // @ts-ignore
        let obj = allDoors.find(o => o.local_door_id === id);
        // @ts-ignore
        return obj["name"];
    }

    function getPermNameByID(id: number) {
        // @ts-ignore
        let obj = allPerm.find(o => o.perm_name_id === id);
        // @ts-ignore
        return obj["name"];
    }

    function delUser(userId: number | undefined) {

        setIsLoading(true);
        // @ts-ignore
        UserService.removeUser(userId).then(
            result => {setIsLoading(false);setModalActive(false);getUsers(); } ,
                error => {setIsLoading(false); })

    }

    function updateUser(userId: number) {
        console.log("UPDATE");
        let tmp: USerTemp = {email: email, name: login, onoff: onoff};

        UserService.updateUser(userId,{permission: perm,doors: check, user: tmp})

    }





    const handleChange = (e: { target: { value: string ; checked: any; }; }) => {
        var updatedList = [...check];
        const { value, checked } = e.target;
        if (checked) {
            updatedList = [...updatedList, Number(value)];
        } else {
            updatedList.splice(updatedList.indexOf(Number(value)), 1);
        }
        console.log(updatedList);
        setCheck(updatedList);
    };

    const handleChangePerm = (e: { target: { value: string ; checked: any; }; }) => {
        var updatedList = [...perm];
        const { value, checked } = e.target;
        if (checked) {
            updatedList = [...perm, Number(value)];
        } else {
            updatedList.splice(perm.indexOf(Number(value)), 1);
        }
        setPerm(updatedList);
    };


    return (
        <MainContainer>
            <EmptyContainer>

                <Modal active={modalActive} setActive={setModalActive}>
                    {isLoading ? <Loading/> : <></>}
                    <PageTitle>Редактирование пользователя</PageTitle>
                    <Line/>
                    <Toggle name="Статус учетной записи" checked={onoff} onChange={()=> {setOnoff(!onoff);}}/>
                    <StyledTextInput2 label="Логин" value={login} onChangeText={setLogin} placeholder="login123" keyboardType="email-address" style={{marginBottom:10}} icon={<LogoutIcon color={brand} />}/>
                    <StyledTextInput2 label="Почта" value={email} onChangeText={setEmail} placeholder="email@email.com" keyboardType="email-address" style={{marginBottom:10}} icon={<LogoutIcon color={brand} />}/>
                    <RegularText>Двери:</RegularText>
                    <div style={{display: "grid"}}>
                            {
                                // console.log(userAll);
                                allDoors?.map(door => { // @ts-ignore
                                    let tmpBool=false;
                                    let tmp = userAll?.doors.find(o => o.local_door_id === door.local_door_id);
                                    if (tmp) tmpBool=true;
                                // @ts-ignore
                                    return (<Toggle key={ door.local_door_id} value={door.local_door_id} name={ getDoorNameByID(door.local_door_id)} checked={check.includes(door.local_door_id)} onChange={handleChange}/>);})
                            }
                    </div>
                    <Line/>
                    <RegularText>Права:</RegularText>
                    <div style={{display: "grid"}}>
                        {
                            // console.log(userAll);
                            allPerm?.map(permi => { // @ts-ignore
                                let tmpBool=false;
                                let tmp = userAll?.permission.find(o => o.perm_name_id === permi.perm_name_id);
                                if (tmp) tmpBool=true;
                                // @ts-ignore
                                return (<Toggle key={ permi.perm_name_id} value={permi.perm_name_id} name={ getPermNameByID(permi.perm_name_id)} checked={perm.includes(permi.perm_name_id)} onChange={handleChangePerm}/>);})
                        }
                    </div>
                    <RegularButton onPress={() => {delUser(userAll?.user.user_id);}}><RegularText >Удалить пользователя</RegularText ></RegularButton>
                    <Line/>
                    <RegularButton onPress={() => { // @ts-ignore
                        updateUser(userAll?.user.user_id);setModalActive(false);}}><RegularText >Обновить пользователя</RegularText ></RegularButton>

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

            </EmptyContainer>
        </MainContainer>
    );
};

export default UsersScreen;