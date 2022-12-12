import $api from "../http";
import {AxiosResponse} from 'axios';
import {IUser} from "../models/IUser";
import {DoorResponse} from "../models/response/DoorsResponse";

export default class DoorsService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        // @ts-ignore
        return $api.get<DoorResponse[]>('/doors')
    }
}
