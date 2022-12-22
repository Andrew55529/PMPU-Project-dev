import React, {FC} from 'react';
import {ListDoorsProps} from "./types";



const ListDoors: FC<ListDoorsProps> = (props) => {

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
                    <h3 className="name">Id</h3>
                    <h3 className="username">{props.local_door_id}</h3>

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

export default ListDoors;
