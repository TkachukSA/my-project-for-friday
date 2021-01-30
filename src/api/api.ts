import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://',
    withCredentials: true,
    headers: {
        'API-KEY': ''
    }
})


export const authAPI = {
    login() {

    },
    me() {

    },
    logout() {

    }
}