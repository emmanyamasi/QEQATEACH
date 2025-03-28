export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role_id: number;
    role_name:string;
}

export interface LoginResponse {
    message: string;
    user: User;
}