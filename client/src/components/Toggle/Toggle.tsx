import React, {FC} from 'react';
import "./Toggle.css";
import {ToggleProps} from "./types";


const Modal: FC<ToggleProps> = (props) => {

    // @ts-ignore
    return (
        <label>
            {props.name}
            <input type="checkbox" checked={props.checked } onChange={props.onChange} value={props.value}/>

            <i></i>
        </label>
    );
};

export default Modal;