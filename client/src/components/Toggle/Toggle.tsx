import React, {FC} from 'react';
import "./Toggle.css";
import {ToggleProps} from "./types";


const Modal: FC<ToggleProps> = (props) => {
    return (
        <label>
            {props.name}
            <input type="checkbox" />
            <i></i>
        </label>
    );
};

export default Modal;