import "./style.css";
import React, {FC} from "react";
import {ListProps} from "./types";
import {ReactComponent as BellIcon} from "../../icons/bell.svg";

const ListBase: FC<ListProps> = (props) => {
    return (
        <div className="list">
            {props.children}
        </div>

    )
}

export default ListBase;