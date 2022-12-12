import React, {FC} from 'react';
import styled from 'styled-components/native';

import {ButtonProps} from "./types";
import RegularText from "../Text/RegularRext";
import {colors} from "../colors";

const {accent,primary} = colors;

export const ButtonView = styled.TouchableOpacity`
  background-color: ${accent};
  width: 100%;
  height: 60px;
  padding: 15px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

const RegularButton: FC<ButtonProps> = (props) => {
    return <ButtonView onPress={props.onPress} style={[{color: primary},props.textStyle]}>{props.children}</ButtonView>
}

export default RegularButton;
