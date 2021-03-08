import {Dispatch} from 'redux'


type RegistrationStateType = {
    newEmail: string,
    newPassword: string,
    confirmedPassword: string
}

const initialState: RegistrationStateType = {
    newEmail: "",
    newPassword: "",
    confirmedPassword: ""
}

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): RegistrationStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return state
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: any) => (dispatch: Dispatch<ActionsType>) => {

}


// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
