import React, {FC} from 'react';
import styled from 'styled-components/native';
import {ReactComponent as YesIcon} from "../../icons/yes.svg";
import {ReactComponent as NoIcon} from "../../icons/no.svg";
import {ListItemUsersProps} from "./types";


const ListUsers: FC<ListItemUsersProps> = (props) => {
    // const [os,browser]=props.ua?.split("|");
    return (

        <div className="line">
            <div className="block user">
                <div className="details">
                    <h3 className="name">Name</h3>
                    <h3 className="username">{props.name}</h3>

                </div>
            </div>
            <div className="block user">
                <div className="details">
                    <h3 className="name">Email</h3>
                    <h3 className="username">{props.email}</h3>

                </div>
            </div>

            <div className="status">

                    <div className="details">
                        <h3 className="name">Status</h3>
                        {props.onoff ? <YesIcon/>: <NoIcon/>}

                    </div>

            </div>


            <div className="block contact" onClick={props.onBtn}>
                <a href="#" className="btn" >
                    Edit
                </a>
            </div>


        </div>


    )
}

export default ListUsers;
