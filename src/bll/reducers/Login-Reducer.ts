import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/LoginApi";
import {setUserAc} from "./profile-reducer";
import {setApiStatusAC, setErrorAC} from "./appReducer";


type ActionsType =
    |SetApiStatusACType

export type LoginInitialStateType = {
    isLoginIn: boolean
}


const initialState: LoginInitialStateType = {isLoginIn: false}

export const loginReducer = (state: LoginInitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'LogIn':
            return {...state, isLoginIn: action.value}
        case 'LogOut':
            return {...state, isLoginIn: action.value}

        default:
            return state
    }
}


export const logInTC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setApiStatusAC('loading'))
        let res = await authAPI.login(data)
        if (res.status === 200) {
            dispatch(logInAC(true))
            dispatch(setUserAc(res.data))
            dispatch(setApiStatusAC('succeeded'))
        } else {
            dispatch(logInAC(false))
            dispatch(setErrorAC('Unknown Error'))
            dispatch(setApiStatusAC('failed'))
        }


    } catch (error) {
        console.log(error)
        dispatch(setErrorAC(error.response.data.error))
        dispatch(setApiStatusAC('failed'))
    }
}

export const logOutTC = () => async (dispatch: Dispatch) => {
    dispatch(setApiStatusAC('loading'))
    try {
        let res = await authAPI.logout()
        if (res.status === 200)
            dispatch(logInAC(false))
        else {
            dispatch(setErrorAC('Unknown Error'))
            dispatch(setApiStatusAC('failed'))
        }
    } catch (error) {
        dispatch(setErrorAC(error.response.data.error))
        dispatch(setApiStatusAC('failed'))
    }
}


export const logInAC = (value: boolean) => {
    return {
        type: "LogIn",
        value
    } as const
}
export const logOutAC = (value: boolean) => {
    return {
        type: "LogOut",
        value
    } as const
}

type SetApiStatusACType = ReturnType<typeof logInAC> | ReturnType<typeof logOutAC>


/*


    email: "nya-admin@nya.nya"
    password: "1qazxcvBG"
	*/
