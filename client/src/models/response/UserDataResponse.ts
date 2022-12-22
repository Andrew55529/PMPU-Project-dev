export interface USerTemp {
    user_id?: number;
    name: string;
    onoff: boolean;
    email: string;
    created_by?: number;
}

interface PermTemp {
    perm_name_id: number;
    gived_by: number;
}

interface DootsTemp {
    local_door_id: number;
    gived_by: number;
}

export interface UserResponse {
    user: USerTemp;
    permission: PermTemp[];
    doors: DootsTemp[];
}