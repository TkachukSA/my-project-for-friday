import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://',
    withCredentials: true,
})


export const authAPI = {
    login() {

    },
    me() {

    },
    logout() {

    }
}