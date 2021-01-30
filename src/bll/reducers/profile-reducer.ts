import {Dispatch} from "redux";

const initialState = {

}
type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}
// actions
export const AC = () => ({type: '---'} as const)

// thunks
export const TC = (data: any) => (dispatch: Dispatch<ActionsType>) => {
    }

// types
type ActionsType = ReturnType<typeof AC>
