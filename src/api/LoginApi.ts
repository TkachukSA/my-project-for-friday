import axios from 'axios'


const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export type UserType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
};

export type ResponseDataType = UserType & LoginParamsType


export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean
}


export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseDataType>('auth/login', data)
    },
    me() {
        return instance.post('auth/me', {})// проверка залогинен или нет
    },
    logout() {
        return instance.delete('auth/me', {})// разлогинивание
    },
    ping() {
    }
}
