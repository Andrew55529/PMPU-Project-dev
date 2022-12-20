import React, {FC} from 'react';
import styled from 'styled-components/native';
import {ReactComponent as YesIcon} from "../../icons/yes.svg";
import {ListItemProps, ListItemUsersProps, ListProps} from "./types";
import DoorsService from "../../services/DoorsService";
import UserService from "../../services/UserService";

export const StyledView = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: 40px;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  text-align-: middle;
`

const ListUsers: FC<ListItemUsersProps> = (props) => {
    function genTime(st:string) {
        const tmp=new Date(st);
        return tmp.getHours()+":"+tmp.getMinutes()+":"+tmp.getSeconds()+" "+tmp.getDate()+"/"+tmp.getMonth()+"/"+tmp.getFullYear();

    }
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
                        <YesIcon/>
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
