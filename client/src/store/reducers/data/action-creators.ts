import {DataState, DataAction,DataActionEnum,SetDataAction} from "./types";
import {IUser} from "../../../models/IUser";
import {DoorResponse} from "../../../models/response/DoorsResponse";
import {AppDsipatch} from "../../index";
import AuthService from "../../../services/AuthService";
import $api from "../../../http";
import {AuthResponse} from "../../../models/response/AuthResponse";

export const DataActionCreator = {
    setDoors: (doors: DoorResponse[]): SetDataAction => ({type: DataActionEnum.SET_DOORS, payload: doors}),

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

}