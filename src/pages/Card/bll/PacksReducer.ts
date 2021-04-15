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
        case "SET_PAGE_SIZE": {
            return {...state, pageSize: action.size}
        }
        case "SORT_PAGE": {
            return {...state, sort: action.sort}
        }
        case "LOADING":{
            return {...state, isLoading: action.loading}
        }


        default:
            return state
    }
}

// actions
export const getCardsPacksAC = (data: CardPacksType[]) => ({type: 'GET_CARDS_PACKS', data} as const)

export const getCcardPacksCountAC = (value: number) => ({type: 'GET_CARDS_TOTAL_COUNT', value} as const)
export const setCurrentPageAC = (value: number) => ({type: 'SET_CURRENT_PAGE', value} as const)
export const setPageSizeAC = (size: number) => ({type: 'SET_PAGE_SIZE', size} as const)
export const sortPacksAC = (sort: SortType) => ({type: 'SORT_PAGE', sort} as const)
export const isLoadingAC = (loading: boolean) => ({type: 'LOADING', loading} as const)
export const getCardsCC = (cards: []) => ({type: 'GET_CARDS', cards} as const)


// thunks
export const getPacksTC = (page: number = 1, pageCount: number = 10, packName?: string, min?: number, max?: number) => (dispatch: Dispatch<any>) => {
    dispatch(setCurrentPageAC(page))
    dispatch(setPageSizeAC(pageCount))
    dispatch(isLoadingAC(true))

    packsAPI.getCardPacks(page, pageCount, packName, min, max)
        .then((res) => {
            dispatch(getCcardPacksCountAC(res.data.cardPacksTotalCount))
            dispatch(getCardsPacksAC(res.data.cardPacks))
            dispatch(isLoadingAC(false))
            dispatch(getCardsCC([]))
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

export const addPackTC = (title: string) => (dispatch: Dispatch<any>) => {
    dispatch(isLoadingAC(true))

    packsAPI.createPack(title)
        .then((res) => {
            dispatch(getPacksTC())
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

export const delitePackTC = (id: string) => (dispatch: Dispatch<any>) => {
    dispatch(isLoadingAC(true))

    packsAPI.delitePack(id)
        .then((res) => {
            dispatch(getPacksTC())
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


type ActionsType =
    | ReturnType<typeof getCardsPacksAC>
    | ReturnType<typeof getCcardPacksCountAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setPageSizeAC>
    | ReturnType<typeof sortPacksAC>
    | ReturnType<typeof isLoadingAC>
    /*| ReturnType<typeof getCardsCC>*/


