import {AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../models/IUser";
import {AppDsipatch} from "../../index";
import AuthService from "../../../services/AuthService";
import $api from "../../../http";
import {AuthResponse} from "../../../models/response/AuthResponse";

export const AuthActionCreator = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    login: (username:string,password:string) => async (dispatch: AppDsipatch) => {
        try {
            console.log(username,password)
            dispatch(AuthActionCreator.setIsLoading(true));
            const response = await AuthService.login(username,password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            const datafromtoken=JSON.parse(atob(response.data.accessToken.split('.')[1]));
            dispatch(AuthActionCreator.setIsAuth(true));
            dispatch(AuthActionCreator.setUser({userId: datafromtoken["userId"], permission: datafromtoken["permission"],sessionId:datafromtoken["sessionId"]  }));

        }catch (e:any) {

            dispatch(AuthActionCreator.setError(e.response?.data?.message))
        }

    },
    registration_temp: (username:string,password:string) => async (dispatch: AppDsipatch) => {
        try {
            console.log(username,password)
            dispatch(AuthActionCreator.setIsLoading(true));
            const response = await AuthService.registration(username,password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            const datafromtoken=JSON.parse(atob(response.data.accessToken.split('.')[1]));
            dispatch(AuthActionCreator.setIsAuth(true));
            dispatch(AuthActionCreator.setUser({userId: datafromtoken["userId"], permission: datafromtoken["permission"],sessionId:datafromtoken["sessionId"]  }));

        }catch (e:any) {

            dispatch(AuthActionCreator.setError(e.response?.data?.message))
        }

    },
    checkAuth: () => async (dispatch: AppDsipatch) => {
        try {
            console.log("[AUTH] start");
            dispatch(AuthActionCreator.setIsLoading(true));
            const response = await $api.get<AuthResponse>(`/refresh`);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            const datafromtoken=JSON.parse(atob(response.data.accessToken.split('.')[1]));
            dispatch(AuthActionCreator.setIsAuth(true));
            dispatch(AuthActionCreator.setUser({userId: datafromtoken["userId"], permission: datafromtoken["permission"],sessionId:datafromtoken["sessionId"]  }));
        }catch (e:any) {
            console.log("[AUTH] error");
            dispatch(AuthActionCreator.setError(e.response?.data?.message))
        } finally {
            dispatch(AuthActionCreator.setIsLoading(false));
        }
        console.log("[AUTH] end");

    },
    logout: () => async (dispatch: AppDsipatch) => {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            dispatch(AuthActionCreator.setIsAuth(false));
            dispatch(AuthActionCreator.setUser({} as IUser));

        }catch (e:any) {
            console.log(e);
        }
    },
}