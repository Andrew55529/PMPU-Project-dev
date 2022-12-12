import React, {FC} from 'react';
import styled from 'styled-components/native';

import {ContainerProps} from "./types";

export const StyledView = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: 40px;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  text-align-: middle;
`

const MainContainer: FC<ContainerProps> = (props) => {
    return <StyledView style={props.style}>{props.children}</StyledView>
}

export default MainContainer;
