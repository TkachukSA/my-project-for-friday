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

export const packsAPI = {
    getCards(pageCount?: number,packName?: string, min?: number, max?: number) {

        return instance.get('cards/pack', {
            params: {
                packName,
                max,
                min,
                pageCount
            }
        })
    },
    getCardPacks(page: number, pageCount: number) {
        return instance.get(`cards/pack?page=${page}&pageCount=${pageCount}`);
    }
}