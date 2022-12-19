import {DoorResponse} from "../../../models/response/DoorsResponse";
import {UsersResponse} from "../../../models/response/UsersResponse";
import {LogsResponse} from "../../../models/response/LogsResponse";
import {SessionsResponse} from "../../../models/response/SessionsResponse";

export interface DataState {
    doors: DoorResponse[];
    users: UsersResponse[];
    logs: LogsResponse[];
    sessions: SessionsResponse[];
}

export enum DataActionEnum {
    SET_DOORS= "SET_DOORS",
    SET_USERS= "SET_USERS",
    SET_LOGS= "SET_LOGS",
    SET_SESSIONS="SET_SESSIONS",
}
export interface SetDataAction {
    type: DataActionEnum.SET_DOORS;
    payload: DoorResponse[];
}
export interface SetUsersAction {
    type: DataActionEnum.SET_USERS;
    payload: UsersResponse[];
}

export interface SetSessionsAction {
    type: DataActionEnum.SET_SESSIONS;
    payload: SessionsResponse[];
}

export interface SetLogsAction {
    type: DataActionEnum.SET_LOGS;
    payload: LogsResponse[];
}

export  type  DataAction = SetDataAction | SetUsersAction | SetLogsAction | SetSessionsAction
