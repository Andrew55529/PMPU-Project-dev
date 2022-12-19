import {DataState, DataAction,DataActionEnum} from "./types";

const initialState: DataState = {
    doors: [],
    users: [],
    logs: [],
    sessions: [],
}
export default function authReducer(state=initialState, action: DataAction):DataState {
    switch (action.type){
        case DataActionEnum.SET_DOORS:
            return {...state,doors: action.payload}
        case DataActionEnum.SET_USERS:
            return {...state,users: action.payload}
        case DataActionEnum.SET_SESSIONS:
            return {...state,sessions: action.payload}
        case DataActionEnum.SET_LOGS:
            return {...state,logs: action.payload}
        default:
            return state;
    }
}
