import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../bll/store/store";
import {CardPacksType, CardsApiType} from "../dall/cardsApi";
import {getPacksTC} from "../bll/PacksReducer";
import s from './Cards.module.css'
import {Paginations} from "./Pagination";
import l from '../../../common/c1-LoadingBar/Loading.module.css'
import {getCardsTC} from "../bll/CardsReducer";


export function Cards() {
    const cards = useSelector<AppStoreType, CardsApiType[]>(state => state.cards.card)
    const isLoading = useSelector<AppStoreType, boolean>(state => state.packs.isLoading)
    const error = useSelector<AppStoreType, string>(state => state.recovery.error)
    const cardPacksTotalCount = useSelector<AppStoreType, number>(state => state.packs.cardPacksTotalCount)
    const pageSize = useSelector<AppStoreType, number>(state => state.packs.pageSize)
    const dispatch = useDispatch()

    useEffect(() => {

    }, [])


    const findTitle = (page: number, pageSize: number, find: string) => {
        dispatch(getCardsTC( null,page, pageSize, find))
    }

    const chengedDoubleRange = (page: number, pageSize: number, find: string, min: number, max: number) => {
        dispatch(getCardsTC(null, page, pageSize, find, min, max))
    }
    const onChangeselect = (page: number, pageSize: number, find: string) => {
        dispatch(getCardsTC(null,page, pageSize, find))
    }


    return (

        <div className={isLoading ? l.loader : ''}>

            <div className={isLoading ? s.err : ''}>

                <Paginations
                    onChangeselect={onChangeselect}
                    chengedDoubleRange={chengedDoubleRange}
                    findTitle={findTitle}
                    cardPacksTotalCount={cardPacksTotalCount}
                    pageSize={pageSize}
                />


                <table className={s.table}>
                    <thead>
                    <tr>
                        <th>Question</th>
                        <th>Grade</th>
                        <th>updated</th>
                        <th>questionImg</th>
                    </tr>
                    </thead>
                    {
                        cards && cards.map((t) =>
                            <tbody key={t._id}>
                            <tr key={t._id}>
                                <td>{t.question}</td>
                                <td >{t.grade}</td>
                                <td>{t.updated}</td>
                                <td>{t.questionImg}</td>

                            </tr>
                            </tbody>
                        )}
                </table>
            </div>
            <div>{error}</div>
        </div>
    );
}

