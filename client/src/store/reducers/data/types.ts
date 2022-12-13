import {DoorResponse} from "../../../models/response/DoorsResponse";
import {UsersResponse} from "../../../models/response/UsersResponse";

export interface DataState {
    doors: DoorResponse[];
    users: UsersResponse[];
}

export enum DataActionEnum {
    SET_DOORS= "SET_DOORS",
    SET_USERS= "SET_USERS",
}
export interface SetDataAction {
    type: DataActionEnum.SET_DOORS;
    payload: DoorResponse[];
}
export interface SetUsersAction {
    type: DataActionEnum.SET_USERS;
    payload: UsersResponse[];
}

export  type  DataAction = SetDataAction | SetUsersAction
