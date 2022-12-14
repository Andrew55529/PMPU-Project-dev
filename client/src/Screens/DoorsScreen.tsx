import React, {FC, useEffect} from "react";
import {Line, PageLogo, PageTitle} from "../components/styles";
import EmptyContainer from "../components/Containers/EmptyContainer";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useAction} from "../hooks/useAction";
import MainContainer from "../components/Containers/MainContainer";
import RegularText from "../components/Text/RegularRext";
import RegularButton from "../components/Buttons/RegularButton";
import DoorsService from "../services/DoorsService";


const DoorsScreen: FC = () => {
    const {isAuth, isLoading} = useTypedSelector(state => state.auth);
    const {doors} = useTypedSelector(state => state.data);
    useEffect(() => {
        console.log(isAuth,isLoading);
        console.log("123",doors);
    }, [])

    const {getDoors} = useAction();
    useEffect(() => {
            getDoors();
    }, [])


    return (
        <MainContainer>
            <EmptyContainer>
                <PageLogo resizeMode="cover" source={require('../assets/logo.png')}/>
                <PageTitle> 123123</PageTitle>

                {
                    doors.map(door => {
                        console.log(door);
                        return (
                            <React.Fragment key={door.local_door_id}>
                                <RegularButton key={door.local_door_id} onPress={() => {DoorsService.openDoor(door.local_door_id);}}><RegularText >{door.name}</RegularText ></RegularButton>
                                <Line key={"l"+door.local_door_id}  />
                            </React.Fragment>
                            // <RegularText>{door.name}{door.local_door_id}</RegularText>
                        );
                    })

                }
            </EmptyContainer>
        </MainContainer>
    );
};

export default DoorsScreen;