import {DoorResponse} from "../../../models/response/DoorsResponse";

export interface DataState {
    doors: DoorResponse[];
}

export enum DataActionEnum {
    SET_DOORS= "SET_DOORS",
}
export interface SetDataAction {
    type: DataActionEnum.SET_DOORS;
    payload: DoorResponse[];

}

export  type  DataAction = SetDataAction
