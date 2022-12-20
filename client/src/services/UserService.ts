import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {IUser} from "../models/IUser";
import {BasicResponse} from "../models/response/BasicResponse";

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


}
