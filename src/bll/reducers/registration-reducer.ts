import {Dispatch} from 'redux'
import {authAPI, dataNewUserType} from "../../api/api";


export type RegistrationStateType = {
    error: string,
    redirect: boolean
}

const initialState: RegistrationStateType = {
    error: "",
    redirect: false
}

type InitialStateType = typeof initialState

export const registrationReducer = (state: InitialStateType = initialState, action: ActionsType): RegistrationStateType => {
    switch (action.type) {
        case 'registration/ERROR':
            return {
                ...state, error: action.error
            }
        case 'registration/SET-REDIRECT':
            return {
                ...state, redirect: action.redirect
            }
        default:
            return state
    }
}

// actions
export const setErrorAC = (error: string) =>
    ({type: 'registration/ERROR', error} as const)
export const setRedirectAC = (redirect: boolean) =>
    ({type: 'registration/SET-REDIRECT', redirect} as const)


// thunks
export const registrationTC = (data: dataNewUserType) => (dispatch: Dispatch<ActionsType>) => {

    authAPI.registration(data)
        .then((res) => {
            if (!res.data.error) {
                console.log("registration done")
                dispatch(setRedirectAC(true))
            } else {
                console.log(res.data.error)
            }
        })
        .catch((error) => {
            dispatch(setErrorAC(error))
        })
}


// types
type ActionsType = ReturnType<typeof setErrorAC | typeof setRedirectAC>
