import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {IUser} from "../models/IUser";
import {BasicResponse} from "../models/response/BasicResponse";
import {UserResponse} from "../models/response/UserDataResponse";
import {DoorResponse} from "../models/response/DoorsResponse";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }

    static delSession(sessionId: number): Promise<AxiosResponse<boolean>> {
        return $api.delete<boolean>('/sessions/'+sessionId)
    }

    static addUser(login: string, email: string): Promise<AxiosResponse<BasicResponse>> {
        return $api.post<BasicResponse>('/users/add', {login, email})
    }

    static getUser(user_id: number): Promise<AxiosResponse<UserResponse>> {
        return $api.get<UserResponse>('/users/'+user_id)
    }

    static getAllDoors(): Promise<AxiosResponse<DoorResponse[]>> {
        return $api.get<DoorResponse[]>('/doors')
    }


}
