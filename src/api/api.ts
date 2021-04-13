import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    /*baseURL: 'http://localhost:7542/2.0/',*/
    withCredentials: true,
})


export const authAPI = {
    login() {

    },
    me() {
        return instance.put('auth/me')


    },
    logout() {

    },
    registration(data: dataNewUserType) {
        return instance.post<ResponseRegistrationType>('/auth/register', data)
    }
}
type ResponseRegistrationType = {
    addedUser: {},
    error?: string,
}


export type dataNewUserType = {
    email: string,
    password: string
}
