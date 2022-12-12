import React, {FC} from 'react';
import styled from 'styled-components/native';

import {TextProps} from "./types";
import {colors} from "../colors";
const {black} =colors;

export const StyledText = styled.Text`
  font-size: 15px;
  text-align: left;
  color: ${black};
`

const RegularText: FC<TextProps> = (props) => {
    return <StyledText style={props.style}>{props.children}</StyledText>
}

export default RegularText;
