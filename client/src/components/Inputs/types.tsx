import {ReactNode} from 'react';
import { StyleProp,ViewStyle, TextInputProps } from 'react-native';

interface ExtraInputProps {

    label: ReactNode;
    icon: ReactNode;
    isPassword?: Boolean;

}

export type InputProps = TextInputProps & ExtraInputProps;
