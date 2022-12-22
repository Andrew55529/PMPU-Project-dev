import $api from "../http";
import {AxiosResponse} from 'axios';
import {IUser} from "../models/IUser";
import {BasicResponse} from "../models/response/BasicResponse";
import {UserResponse} from "../models/response/UserDataResponse";
import {DoorResponse} from "../models/response/DoorsResponse";
import {PermissionResponse} from "../models/response/PermissionsRespone";

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

    static removeUser(userId: number): Promise<AxiosResponse<BasicResponse>> {
        return $api.delete<BasicResponse>('/users/'+userId)
    }

    static getUser(user_id: number): Promise<AxiosResponse<UserResponse>> {
        return $api.get<UserResponse>('/users/'+user_id)
    }



    static getAllPerm(): Promise<AxiosResponse<PermissionResponse[]>> {
        return $api.get<PermissionResponse[]>('/permissions')
    }

    static updateUser(user_id: number,data: any): Promise<AxiosResponse<BasicResponse[]>> {
        return $api.put<BasicResponse[]>('/users/'+user_id,data);
    }


    static getAllDoors(): Promise<AxiosResponse<DoorResponse[]>> {
        return $api.get<DoorResponse[]>('/doors')
    }

    static delDoor(door_id: number): Promise<AxiosResponse<BasicResponse[]>> {
        return $api.delete<BasicResponse[]>('/doors/'+door_id);
    }

    static addDoor(local_door_id: number,name: string): Promise<AxiosResponse<BasicResponse[]>> {
        return $api.post<BasicResponse[]>('/doors',{local_door_id,name});
    }

    static updateDoor(door_id: number,local_door_id: number,name: string): Promise<AxiosResponse<BasicResponse[]>> {
        return $api.put<BasicResponse[]>('/doors/'+door_id,{local_door_id,name});
    }





}
