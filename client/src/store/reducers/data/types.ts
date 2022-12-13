import {DoorResponse} from "../../../models/response/DoorsResponse";
import {UsersResponse} from "../../../models/response/UsersResponse";
import {LogsResponse} from "../../../models/response/LogsResponse";

export interface DataState {
    doors: DoorResponse[];
    users: UsersResponse[];
    logs: LogsResponse[];
}

export enum DataActionEnum {
    SET_DOORS= "SET_DOORS",
    SET_USERS= "SET_USERS",
    SET_LOGS= "SET_LOGS",
}
export interface SetDataAction {
    type: DataActionEnum.SET_DOORS;
    payload: DoorResponse[];
}
export interface SetUsersAction {
    type: DataActionEnum.SET_USERS;
    payload: UsersResponse[];
}

export interface SetLogsAction {
    type: DataActionEnum.SET_LOGS;
    payload: LogsResponse[];
}

export  type  DataAction = SetDataAction | SetUsersAction | SetLogsAction
