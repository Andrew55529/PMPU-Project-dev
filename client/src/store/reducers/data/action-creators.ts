import {DataState, DataAction, DataActionEnum, SetDataAction, SetUsersAction} from "./types";
import {IUser} from "../../../models/IUser";
import {DoorResponse} from "../../../models/response/DoorsResponse";
import {AppDsipatch} from "../../index";
import AuthService from "../../../services/AuthService";
import $api from "../../../http";
import {AuthResponse} from "../../../models/response/AuthResponse";
import {UsersResponse} from "../../../models/response/UsersResponse";

export const DataActionCreator = {
    setDoors: (doors: DoorResponse[]): SetDataAction => ({type: DataActionEnum.SET_DOORS, payload: doors}),
    setUsers: (users: UsersResponse[]): SetUsersAction => ({type: DataActionEnum.SET_USERS, payload: users}),

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
            console.log("[DOORS] start");
            const response = await $api.get<UsersResponse[]>(`/users`);
            console.log(response.data)
            dispatch(DataActionCreator.setUsers(response.data));

        }catch (e:any) {
            console.log("[DOORS] error");
            // dispatch(AuthActionCreator.setError(e.response?.data?.message))
        } finally {
            // dispatch(AuthActionCreator.setIsLoading(false));
        }
        console.log("[DOORS] end");

    },

}