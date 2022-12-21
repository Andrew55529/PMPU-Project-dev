import React, {FC} from 'react';
import "./Toggle.css";
import {ToggleProps} from "./types";


const Modal: FC<ToggleProps> = (props,checked=false) => {

    // @ts-ignore
    return (
        <label>
            {props.name}
            <input type="checkbox" defaultChecked={props.checked }/>

            <i></i>
        </label>
    );
};

export default Modal;