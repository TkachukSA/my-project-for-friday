import {Dispatch} from 'redux'
import {CardPacksType, CardsApiType, packsAPI} from "../dall/cardsApi";
import {setAppErrorAC} from "../../../auth/recovery-password/RecoveryReducer";

type SortType = {
    min: number
    max: number
}

const initialState = {
    cardPacks: [] as Array<CardPacksType>,
    cardsPack_id: '',
    cardPacksTotalCount: 14,
    maxCardsCount: 4,
    minCardsCount: 0,
    currentPage: 1,
    pageSize: 10,
    packsTotalCount: 5,
    isLoading: false,
    sort: {} as SortType,
    card: [] as CardsApiType[]
}

type InitialStateType = typeof initialState

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case "LOADING":{
            return {...state, isLoading: action.loading}
        }
        case "GET_CARDS":{
            return {...state, card: action.cards}
        }

        default:
            return state
    }
}

// actions

export const isLoadingAC = (loading: boolean) => ({type: 'LOADING', loading} as const)
export const getCardsCC = (cards: []) => ({type: 'GET_CARDS', cards} as const)


// thunks


export const getCardsTC = (id:string | null, page: number = 1, pageCount: number = 10, packName?: string, min?: number, max?: number) => (dispatch: Dispatch<any>) => {

    dispatch(isLoadingAC(true))

    packsAPI.getCards(id,page,pageCount,packName,min,max)
        .then((res) => {
            dispatch(getCardsCC(res.data.cards))
            dispatch(isLoadingAC(false))
        }).catch((err) => {
        if (err.response) {
            dispatch(setAppErrorAC(err.response.data.error))
        } else {
            dispatch(setAppErrorAC('dangerous mistake'))
        }
    }).finally(()=>{
        dispatch(isLoadingAC(false))
    })

}


// types
type ActionsType =
    | ReturnType<typeof isLoadingAC>
    | ReturnType<typeof getCardsCC>


