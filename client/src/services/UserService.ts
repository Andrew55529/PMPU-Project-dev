import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {IUser} from "../models/IUser";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }

    static delSession(sessionId: number): Promise<AxiosResponse<boolean>> {
        return $api.delete<boolean>('/sessions/'+sessionId)
    }


}
