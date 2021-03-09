import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    //baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

// export type APIResponseType<T = {}> = {
//     data: T
//     statusText: string
//     status: number
// }
// export type RecoveryPasswordType = {
//     answer: boolean
//     html: boolean
//     info: string
//     success: boolean
//
// }
type RecoveryResponseType = {
    answer: boolean
    html: boolean
    success: boolean
    info: any
    status: number
    statusText: string
    error?: string
}
export type NewPasswordRequestType = {
    password: string
    resetPasswordToken: string
    info: any
    status: number
    statusText: string
}

export const recoveryAPI = {
    forgotEmail(email: string) {
        return instance.post<RecoveryResponseType>('auth/forgot', {
            email: email,
            from: "test-front-admin <crafta.net@gmail.com>",
            message: `<div style="background-color: darkcyan; padding: 15px">
                            password recovery link: 
                     <a href='http://localhost:3000/?#/newpassword/$token$'>Click</a>
                     </div>`
        })
    },
    resetPassword(password: string, token: string | undefined) {
        return instance.post<NewPasswordRequestType>('auth/set-new-password', {
            password,
            resetPasswordToken: token
        })
    },
}