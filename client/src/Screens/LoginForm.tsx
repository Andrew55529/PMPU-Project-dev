import React, {Dispatch, FC, useContext, useState} from 'react';
// import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {colors} from "../components/colors";
import {  Line,  MsgBox,  PageTitle, SubTitles} from '../components/styles';
import {ReactComponent as GoogleIcon} from "../icons/google.svg";
import {ReactComponent as LogoutIcon} from "../icons/logout.svg";
import {ReactComponent as LogoIcon} from "../icons/logo.svg";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useAction} from "../hooks/useAction";
import MainContainer from "../components/Containers/MainContainer";
import StyledTextInput2 from "../components/Inputs/StyledTextInput";
import RegularButton from "../components/Buttons/RegularButton";
import EmptyContainer from "../components/Containers/EmptyContainer";
import RegularText from '../components/Text/RegularRext';



const {brand,darkLight,primary,green} = colors;



const LoginScreen: FC = () => {
    const [hidePassword,setHidePassword] = useState<boolean>(true);
    // const {store} = useContext(Context);

    const {login,registration_temp} = useAction();

    const {error,isLoading} = useTypedSelector(state => state.auth);

    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    return (
        <MainContainer>
            <EmptyContainer>
                <LogoIcon width="250px" height="250px"/>
                <PageTitle>Voli</PageTitle>
                <SubTitles>Account login</SubTitles>
                { isLoading && <MsgBox><SubTitles>Loading</SubTitles></MsgBox> }
                { error != "" && <MsgBox><SubTitles>{error}</SubTitles></MsgBox> }
                <StyledTextInput2 label="Email address" value={email} onChangeText={setEmail} placeholder="email@email.com" keyboardType="email-address" style={{marginBottom:10}} icon={<LogoutIcon color={brand} />}/>
                <StyledTextInput2 label="Password" value={password} onChangeText={setPassword} placeholder="****" isPassword={true} style={{marginBottom:10}} icon={<LogoutIcon color={brand} />}/>
                <RegularButton onPress={() => {login(email,password);}}><RegularText >Press m1e</RegularText ></RegularButton>
                <Line />
                <RegularButton  textStyle={{backgroundColor: green }} onPress={() => {registration_temp(email,password);}} ><GoogleIcon/><RegularText >Press m2e</RegularText></RegularButton>
            </EmptyContainer>
        </MainContainer>
    );
};





export default observer(LoginScreen);

