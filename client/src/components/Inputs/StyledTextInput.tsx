import React, {FC, useState} from 'react';
import styled from 'styled-components/native';

import {colors} from "../colors";

import {InputProps} from "./types";
import {ReactComponent as LogoutIcon} from "../../icons/logout.svg";
import SmallText from "../Text/SmallText";
import {ReactComponent as EyeIcon} from "../../icons/eyePassword.svg";
import {ReactComponent as EyeOffIcon} from "../../icons/eyeOff.svg";
const {primary,secondary,brand,black,gray} = colors;

const InputWrapper = styled.View`
 //width: 100%;
`


const LeftIcon = styled.View`
  position: absolute;
  left: 15px;
  top: 38px;
  z-index: 1;
  border-right-width: 2px;
  border-color: $(secondary);
  padding-right: 10px;
`

const InputField = styled.TextInput`
  background-color: ${primary};
  height: 60px;
  border-width: 2px;
  border-radius: 10px;
  border-color: ${secondary};
  margin-vertical: 3px;
  margin-bottom: 10px;
  padding: 15px;
  padding-left: 65px;
  padding-right: 55px;
  font-size: 16px;
  color: ${black}
`
const RightIcon = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  top: 38px;
  z-index: 1;
`

const StyledTextInput2: FC<InputProps> = ({label,icon ,isPassword,...props}) => {
    const [inputBackgroundColor,setInputBackgroundColor] = useState(primary);
    const [hidePassword,setHidePassword] = useState(true);
    const customOnFocus = () => {
        // props?.onFocus;
        setInputBackgroundColor(secondary);
    }
    const customOnBlur = () => {
        // props?.onBlur;
        setInputBackgroundColor(primary);
    }
    return (
    <InputWrapper style={props.style}>
        <LeftIcon>
            {icon}

        </LeftIcon>
        {props.children}
        <SmallText>{label}</SmallText>
        <InputField {...props} placeholderTextColor={gray} style={[{backgroundColor:inputBackgroundColor},props.style]} onFocus={customOnFocus} onBlur={customOnBlur} secureTextEntry={isPassword && hidePassword}/>
        {isPassword && (
            <RightIcon onPress={()=>{setHidePassword(!hidePassword)}}>
                {hidePassword ? <EyeIcon color={black} height="30px"  /> : <EyeOffIcon height="30px"  color={black} />}
            </RightIcon>
        )}
    </InputWrapper>
    );
}

export default StyledTextInput2;
