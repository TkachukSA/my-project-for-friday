import axios from 'axios'

const instance = axios.create({
    //baseURL: 'https://neko-back.herokuapp.com/2.0',
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

/*type RecoveryResponseType = {
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
}*/

export type CardPacksType ={
    cardsCount: number
    created: string
    deckCover: null
    more_id: string
    name: string
    private: boolean
    updated: string
    user_id: string
    user_name: string
    _id: string
}
type ResponcePacksType={
    cardPacks:CardPacksType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type CardsApiType={
    answer: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question:string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: string
    _id: string
    answerImg: ""
    answerVideo: ""
    questionImg: "some img"
    questionVideo: ""

}
export const packsAPI = {
    getCards(cardsPack_id: string | null, page: number, pageCount: number, packName: string='',min?: number, max?: number) {

        return instance.get('cards/card', {
            params: {
                cardsPack_id,
                page,
                pageCount,
                packName,
                min,
                max
            }
        })
    },
    getCardPacks(page: number, pageCount: number, packName: string='',min?: number, max?: number) {
        return instance.get<ResponcePacksType>(`cards/pack?page=${page}&pageCount=${pageCount}&packName=${packName}&min=${min}&max=${max}`);
    }
}
//6053873a338d2c15f075ba5e