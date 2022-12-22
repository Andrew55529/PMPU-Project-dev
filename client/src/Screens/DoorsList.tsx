import React, {FC, useEffect, useState} from "react";
import {Line, PageTitle} from "../components/styles";
import EmptyContainer from "../components/Containers/EmptyContainer";
import MainContainer from "../components/Containers/MainContainer";
import RegularText from "../components/Text/RegularRext";
import RegularButton from "../components/Buttons/RegularButton";
import {DoorResponse} from "../models/response/DoorsResponse";
import ListBase from "../components/List/ListBase";
import Modal from "../components/Modal/Modal";
import StyledTextInput2 from "../components/Inputs/StyledTextInput";
import {ReactComponent as LogoutIcon} from "../icons/logout.svg";
import {colors} from "../components/colors";
import UserService from "../services/UserService";
import ListDoors from "../components/List/ListDoors";


const DoorsListScreen: FC = () => {
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [modalType, setModalType] = useState<boolean>(false);
    const [doors,setDoors] = useState<DoorResponse[]>([]);
    const [name,setName] = useState<string>("");
    const [localDoorID,setLocalDoorID] = useState<string>("");
    const [DoorID,setDoorID] = useState<number>(0);
    const {brand} = colors;

    function getDoors() {
        UserService.getAllDoors().then(result => {
            // console.log(result.data);
            setDoors(result.data);
        },error => {
            console.log(error);
        });
    }

    useEffect(()=> {
        getDoors();
    },[])

    // const {isAuth, isLoading} = useTypedSelector(state => state.auth);
    // const {users} = useTypedSelector(state => state.data);
    // // useEffect(() => {
    // //     console.log(isAuth,isLoading);
    // //     console.log("123",doors);
    // // }, [])
    // //
    // const {getUsers} = useAction();
    // useEffect(() => {
    //     getUsers();
    // }, [])

    //
    // const [modalActive, setModalActive] = useState(false);
    //
    // const {brand,green} = colors;
    //
    // const [userAll,setUserAll] = useState<UserResponse>();
    // const [isLoading,setIsLoading] = useState<boolean>(true);
    //
    // const [allDoors,setAllDoors] = useState<DoorResponse[]>();
    // const [allPerm,setAllPerm] = useState<PermissionResponse[]>();
    //
    // const [email,setEmail] = useState<string>("");
    // const [login,setLogin] = useState<string>("");
    // const [check, setCheck] = useState<number[]>([]);
    // const [perm, setPerm] = useState<number[]>([]);
    // const [onoff, setOnoff] = useState<boolean>(false);
    //
    // useEffect(() => {
    //     UserService.getAllDoors().then(result => {// @ts-ignore
    //         setAllDoors(result.data); setIsLoading(false);} ,error => {console.log(error)} )
    // },[]);
    // useEffect(() => {
    //     UserService.getAllPerm().then(result => {// @ts-ignore
    //         setAllPerm(result.data); setIsLoading(false);} ,error => {console.log(error)} )
    // },[]);
    //
    function setModalData(name: string, localID: string,doorId: number) {
        setModalType(false);
        setName(name);
        setLocalDoorID(localID);
        setDoorID(doorId);
    }

    function addDoor(name: string, localID: string) {
        console.log("aDD door"+localID);
        UserService.addDoor(Number(localID), name).then(r => {console.log(r.data);setModalActive(false); getDoors();});

    }

    function updateDoorinfo(door_id: number,name: string, localID: string) {
        console.log("Update door"+door_id);
        UserService.updateDoor(door_id,Number(localID),name).then(result => {
            console.log(result.data);
            setModalActive(false);
            getDoors();
        },error => {
            console.log(error);
        });
    }

    function deleteDoor(door_id: number) {

        UserService.delDoor(door_id).then(result => {
            console.log(result.data);
            setModalActive(false);
            getDoors();
        },error => {
            console.log(error);
        });
        console.log("Delete door"+door_id);
    }
        //
        // UserService.getUser(userId).then(result => {
        //     setUserAll(result.data);
        //     setEmail(result.data.user.email)
        //     setLogin(result.data.user.name);
        //     setOnoff(result.data.user.onoff);
        //     let tmp:number[]=[];
        //     result.data.doors.map(door => {tmp=[...tmp,door.local_door_id];})
        //     setCheck(tmp);
        //
        //     let tmp1:number[]=[];
        //     result.data.permission.map(perma => {tmp1=[...tmp1,perma.perm_name_id];})
        //     setPerm(tmp1);
        //
        //     setIsLoading(false);} ,error => {console.log(error)} )


    //
    //
    // function getDoorNameByID(id: number) {
    //     // @ts-ignore
    //     let obj = allDoors.find(o => o.local_door_id === id);
    //     // @ts-ignore
    //     return obj["name"];
    // }
    //
    // function getPermNameByID(id: number) {
    //     // @ts-ignore
    //     let obj = allPerm.find(o => o.perm_name_id === id);
    //     // @ts-ignore
    //     return obj["name"];
    // }
    //
    // function delUser(userId: number | undefined) {
    //
    //     setIsLoading(true);
    //     // @ts-ignore
    //     UserService.removeUser(userId).then(
    //         result => {setIsLoading(false);setModalActive(false);getUsers(); } ,
    //         error => {setIsLoading(false); })
    //
    // }
    //
    // function updateUser(userId: number) {
    //     console.log("UPDATE");
    //     let tmp: USerTemp = {email: email, name: login, onoff: onoff};
    //
    //     UserService.updateUser(userId,{permission: perm,doors: check, user: tmp})
    //
    // }
    //
    //
    //
    //
    //
    // const handleChange = (e: { target: { value: number ; checked: any; }; }) => {
    //     var updatedList = [...check];
    //     const { value, checked } = e.target;
    //     console.log(value,checked);
    //     if (checked) {
    //         updatedList = [...check, Number(value)];
    //     } else {
    //         updatedList.splice(check.indexOf(value), 1);
    //     }
    //     setCheck(updatedList);
    // };
    //
    // const handleChangePerm = (e: { target: { value: number ; checked: any; }; }) => {
    //     var updatedList = [...perm];
    //     const { value, checked } = e.target;
    //     if (checked) {
    //         updatedList = [...perm, Number(value)];
    //     } else {
    //         updatedList.splice(perm.indexOf(value), 1);
    //     }
    //     setPerm(updatedList);
    // };
    //
    //
    // return (
    //     <MainContainer>
    //         <EmptyContainer>
    //
    //             <Modal active={modalActive} setActive={setModalActive}>
    //                 {isLoading ? <Loading/> : <></>}
    //                 <PageTitle>Редактирование пользователя</PageTitle>
    //                 <Line/>
    //                 <Toggle name="Статус учетной записи" checked={onoff} onChange={()=> {setOnoff(!onoff);}}/>
    //                 <StyledTextInput2 label="Логин" value={login} onChangeText={setLogin} placeholder="login123" keyboardType="email-address" style={{marginBottom:10}} icon={<LogoutIcon color={brand} />}/>
    //                 <StyledTextInput2 label="Почта" value={email} onChangeText={setEmail} placeholder="email@email.com" keyboardType="email-address" style={{marginBottom:10}} icon={<LogoutIcon color={brand} />}/>
    //                 <RegularText>Двери:</RegularText>
    //                 <div style={{display: "grid"}}>
    //                     {
    //                         // console.log(userAll);
    //                         allDoors?.map(door => { // @ts-ignore
    //                             let tmpBool=false;
    //                             let tmp = userAll?.doors.find(o => o.local_door_id === door.local_door_id);
    //                             if (tmp) tmpBool=true;
    //                             // @ts-ignore
    //                             return (<Toggle key={ door.local_door_id} value={door.local_door_id} name={ getDoorNameByID(door.local_door_id)} checked={check.includes(door.local_door_id)} onChange={handleChange}/>);})
    //                     }
    //                 </div>
    //                 <Line/>
    //                 <RegularText>Права:</RegularText>
    //                 <div style={{display: "grid"}}>
    //                     {
    //                         // console.log(userAll);
    //                         allPerm?.map(permi => { // @ts-ignore
    //                             let tmpBool=false;
    //                             let tmp = userAll?.permission.find(o => o.perm_name_id === permi.perm_name_id);
    //                             if (tmp) tmpBool=true;
    //                             // @ts-ignore
    //                             return (<Toggle key={ permi.perm_name_id} value={permi.perm_name_id} name={ getPermNameByID(permi.perm_name_id)} checked={perm.includes(permi.perm_name_id)} onChange={handleChangePerm}/>);})
    //                     }
    //                 </div>
    //                 <RegularButton onPress={() => {delUser(userAll?.user.user_id);}}><RegularText >Удалить пользователя</RegularText ></RegularButton>
    //                 <Line/>
    //                 <RegularButton onPress={() => { // @ts-ignore
    //                     updateUser(userAll?.user.user_id);setModalActive(false);}}><RegularText >Обновить пользователя</RegularText ></RegularButton>
    //
    //             </Modal>



    return (
        <MainContainer>
             <EmptyContainer>
                 <Modal active={modalActive} setActive={setModalActive}>
 {/*//                 {isLoading ? <Loading/> : <></>}*/}
                  <PageTitle>{modalType?"Добавление двери":"Редактироване двери"}</PageTitle>
                  <Line/>
                  <StyledTextInput2 label="Имя" value={name} onChangeText={setName} placeholder="" keyboardType="email-address" style={{marginBottom:10}} icon={<LogoutIcon color={brand} />}/>
                  <StyledTextInput2 label="ID двери" value={localDoorID} onChangeText={setLocalDoorID} placeholder="" keyboardType="email-address" style={{marginBottom:10}} icon={<LogoutIcon color={brand} />}/>
                     {
                         modalType? ""
                         : <RegularButton onPress={() => {updateDoorinfo(DoorID,name,localDoorID);}}><RegularText >Обновить</RegularText ></RegularButton>
                     }
                     {
                         modalType? <RegularButton onPress={() => {addDoor(name,localDoorID);}}><RegularText >Создать</RegularText ></RegularButton>
                             : <Line/>
                     }
                     {
                         modalType? ""
                        : <RegularButton onPress={() => {deleteDoor(DoorID);}}><RegularText >Удалить</RegularText ></RegularButton>
                     }
                 </Modal>



                 <PageTitle> Users</PageTitle>
                 <ListBase>
                  {
                     doors.map(door => {
                         return (
                             <ListDoors key={door.local_door_id } name={door.name} local_door_id={door.local_door_id} onBtn={() => {setModalActive(true); setModalData(door.name,String(door.local_door_id),door.door_id);}}/>
                         )
                     })
                 }
                 <RegularButton onPress={() => {setModalType(true);setName("");setLocalDoorID(""); setModalActive(true);}}><RegularText >Добавить дверь</RegularText ></RegularButton>

                 </ListBase>
             </EmptyContainer>
         </MainContainer>
    );

};

export default DoorsListScreen;