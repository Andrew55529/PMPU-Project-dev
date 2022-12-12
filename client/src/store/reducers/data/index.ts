import {DataState, DataAction,DataActionEnum} from "./types";
import {IUser} from "../../../models/IUser";

const initialState: DataState = {
    doors: []
}
export default function authReducer(state=initialState, action: DataAction):DataState {
    switch (action.type){
        case DataActionEnum.SET_DOORS:
            return {...state,doors: action.payload}
        default:
            return state;
    }
}
