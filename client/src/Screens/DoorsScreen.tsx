import React, {FC, useEffect} from "react";
import {PageLogo, PageTitle} from "../components/styles";
import EmptyContainer from "../components/Containers/EmptyContainer";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useAction} from "../hooks/useAction";
import MainContainer from "../components/Containers/MainContainer";
import RegularText from "../components/Text/RegularRext";


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
                            <RegularText>{door.name}{door.local_door_id}</RegularText>
                        );
                    })

                }
            </EmptyContainer>
        </MainContainer>
    );
};

export default DoorsScreen;