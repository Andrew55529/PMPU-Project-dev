import styled from "styled-components/native"
import {colors} from "./colors";

const { tertiary, darkLight, brand } = colors;

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: 30px;
  background-color: transparent;
`


export const PageLogo = styled.Image`
    width: 250px;
    height: 250px;
`



export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding: 10px;
`

export const SubTitles = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};
`




export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
`

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkLight};
  margin-vertical: 10px;
`