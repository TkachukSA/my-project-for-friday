import {Dispatch} from 'redux'
import {CardPacksType, packsAPI} from "../dall/cardsApi";


const initialState = {
    cardPacks: [] as Array<CardPacksType>,
    cardsPack_id: '',
    cardPacksTotalCount: 14,
    maxCardsCount: 4,
    minCardsCount: 0,
    currentPage: 1,
    pageSize: 10,
    packsTotalCount: 5,
    isLoading: false
}

type InitialStateType = typeof initialState

export const packsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'GET_CARDS_PACKS': {
            return {...state, cardPacks: action.data}
        }
        case "GET_CARDS_TOTAL_COUNT": {
            return {...state, cardPacksTotalCount: action.value}
        }
        case "SET_CURRENT_PAGE": {
            return {...state, currentPage: action.value}
        }

        default:
            return state
    }
}

// actions
export const getCardsPacksAC = (data: CardPacksType[]) => ({type: 'GET_CARDS_PACKS', data} as const)
export const getCcardPacksCountAC = (value: number) => ({type: 'GET_CARDS_TOTAL_COUNT', value} as const)
export const setCurrentPageAC = (value: number) => ({type: 'SET_CURRENT_PAGE', value} as const)


// thunks
export const getCardsTC = (page: number) => (dispatch: Dispatch<any>) => {
    // dispatch(recoveryStatusAC('loading'))

    packsAPI.getCardPacks(page, 15)
        .then((res) => {

            dispatch(getCcardPacksCountAC(res.data.cardPacksTotalCount))
            dispatch(getCardsPacksAC(res.data.cardPacks))
        })

}


// types
type ActionsType =
    | ReturnType<typeof getCardsPacksAC>
    | ReturnType<typeof getCcardPacksCountAC>
    | ReturnType<typeof setCurrentPageAC>


