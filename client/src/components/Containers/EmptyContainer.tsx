import React, {FC} from 'react';
import styled from 'styled-components/native';

import {ContainerProps} from "./types";

export const StyledView = styled.View`
  justify-content: center;
  align-items: center;
  
`

const EmptyContainer: FC<ContainerProps> = (props) => {
    return <StyledView style={props.style}>{props.children}</StyledView>
}

export default EmptyContainer;
