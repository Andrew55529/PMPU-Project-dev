import React, {FC} from 'react';
import "./Modal.css";
import {ListProps} from "./types";


const Modal: FC<ListProps> = (props) => {
    return (
        <div className={props.active ? "modal active": "modal"} onClick={() => props.setActive(false)}>
            <div className={props.active ? "modal__content active": "modal__content"} onClick={e => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
};

export default Modal;