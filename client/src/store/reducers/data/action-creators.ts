import {DataActionEnum, SetDataAction, SetUsersAction, SetSessionsAction} from "./types";
import {DoorResponse} from "../../../models/response/DoorsResponse";
import {AppDsipatch} from "../../index";
import $api from "../../../http";
import {UsersResponse} from "../../../models/response/UsersResponse";
import {SessionsResponse} from "../../../models/response/SessionsResponse";

export const DataActionCreator = {
    setDoors: (doors: DoorResponse[]): SetDataAction => ({type: DataActionEnum.SET_DOORS, payload: doors}),
    setUsers: (users: UsersResponse[]): SetUsersAction => ({type: DataActionEnum.SET_USERS, payload: users}),
    setSessions: (sessions: SessionsResponse[]): SetSessionsAction => ({type: DataActionEnum.SET_SESSIONS, payload: sessions}),

    getDoors: () => async (dispatch: AppDsipatch) => {
        try {
            console.log("[DOORS] start");
            const response = await $api.get<DoorResponse[]>(`/perm/doors`);
            console.log(response.data)
            dispatch(DataActionCreator.setDoors(response.data));

        }catch (e:any) {
            console.log("[DOORS] error");
            // dispatch(AuthActionCreator.setError(e.response?.data?.message))
        } finally {
            // dispatch(AuthActionCreator.setIsLoading(false));
        }
        console.log("[DOORS] end");

    },

    getUsers: () => async (dispatch: AppDsipatch) => {
        try {
            // console.log("[DOORS] start");
            const response = await $api.get<UsersResponse[]>(`/users`);
            console.log(response.data)
            dispatch(DataActionCreator.setUsers(response.data));

        }catch (e:any) {
            console.log("[DOORS] error");
            // dispatch(AuthActionCreator.setError(e.response?.data?.message))
        } finally {
            // dispatch(AuthActionCreator.setIsLoading(false));
        }
        // console.log("[DOORS] end");

    },

    getSessions: () => async (dispatch: AppDsipatch) => {
        try {
            console.log("[Sessions] start");
            const response = await $api.get<SessionsResponse[]>(`/sessions`);
            console.log(response.data)
            dispatch(DataActionCreator.setSessions(response.data));

        }catch (e:any) {
            console.log("[Sessions] error");
            // dispatch(AuthActionCreator.setError(e.response?.data?.message))
        } finally {
            // dispatch(AuthActionCreator.setIsLoading(false));
        }
        console.log("[Sessions] end");

    },

}