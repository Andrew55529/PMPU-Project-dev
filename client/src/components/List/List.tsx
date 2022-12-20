import React, {FC} from 'react';
import styled from 'styled-components/native';
import {ReactComponent as BellIcon} from "../../icons/bell.svg";
import {ListItemProps, ListProps} from "./types";
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

const List: FC<ListItemProps> = (props) => {
    function genTime(st:string) {
        const tmp=new Date(st);
        return tmp.getHours()+":"+tmp.getMinutes()+":"+tmp.getSeconds()+" "+tmp.getDate()+"/"+tmp.getMonth()+"/"+tmp.getFullYear();

    }
    // const [os,browser]=props.ua?.split("|");

    return (

            <div className="line">
                <div className="block user">
                    {/*<div className="profile">*/}
                    {/*    <BellIcon />*/}
                    {/*</div>*/}
                    <div className="details">
                        <h3 className="name">OS|Browser</h3>
                        <h3 className="username">{props.ua}</h3>

                    </div>
                </div>
                <div className="block user">
                    {/*<div className="profile">*/}
                    {/*    <BellIcon />*/}
                    {/*</div>*/}
                    <div className="details">
                        <h3 className="name">IP</h3>
                        <h3 className="username">{props.ip}</h3>
                    </div>
                </div>
                {/*<div className="status">*/}
                {/*    <span></span>*/}
                {/*    <p>active</p>*/}
                {/*</div>*/}
                <div className="block location">
                    <div className="details">
                        <h3 className="name">LastAction</h3>
                        <h3 className="username">{genTime(props.last_action)}</h3>
                    </div>
                    {/*<p>First enter</p>*/}
                </div>
                <div className="block location">
                    <div className="details">
                        <h3 className="name">First enter</h3>
                        <h3 className="username">{genTime(props.first_enter)}</h3>
                    </div>
                    {/*<p>lastAction</p>*/}
                </div>
                {/*<div className="phone">*/}
                {/*    <p>+7929999</p>*/}
                {/*</div>*/}

                <div className="block contact" onClick={() => {UserService.delSession(props.sessionId);}}>
                    <a href="#" className="btn" >
                        Close
                    </a>
                </div>
                {/*<div className="action">*/}
                {/*    <div className="icon">*/}
                {/*        <span></span>*/}
                {/*        <span></span>*/}
                {/*        <span></span>*/}
                {/*    </div>*/}
                {/*</div>*/}


            </div>


    )
}

export default List;
