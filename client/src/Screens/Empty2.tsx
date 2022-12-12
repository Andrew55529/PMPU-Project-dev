import React, {FC} from "react";
import {PageLogo, PageTitle, StyledContainer} from "../components/styles";
import EmptyContainer from "../components/Containers/EmptyContainer";


const Empty2: FC = () => {
    return (
            <StyledContainer>
                <EmptyContainer>
                    <PageLogo resizeMode="cover" source={require('../assets/logo.png')}/>
                    <PageTitle> Emprty2</PageTitle>
                </EmptyContainer>
            </StyledContainer>
    );
};

export default Empty2;