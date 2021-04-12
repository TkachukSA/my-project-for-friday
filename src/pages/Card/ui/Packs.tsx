import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../bll/store/store";
import {CardPacksType} from "../dall/cardsApi";
import {getPacksTC} from "../bll/PacksReducer";
import s from './Packs.module.css'
import {Paginations} from "./Pagination";
import l from '../../../common/c1-LoadingBar/Loading.module.css'
import {NavLink} from "react-router-dom";
import {PATH} from "../../../header/Header";
import {getCardsTC} from "../bll/CardsReducer";


export function Packs() {
    const packs = useSelector<AppStoreType, CardPacksType[]>(state => state.packs.cardPacks)
    const isLoading = useSelector<AppStoreType, boolean>(state => state.packs.isLoading)
    const error = useSelector<AppStoreType, string>(state => state.recovery.error)
    const cardPacksTotalCount = useSelector<AppStoreType, number>(state => state.packs.cardPacksTotalCount)
    const pageSize = useSelector<AppStoreType, number>(state => state.packs.pageSize)
    const currentPage = useSelector<AppStoreType, number>(state => state.packs.currentPage)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPacksTC(currentPage, pageSize))
    }, [])


    const findTitle = (page: number, pageSize: number, find: string) => {
        dispatch(getPacksTC(page, pageSize, find))
    }

    const chengedDoubleRange = (page: number, pageSize: number, find: string, min: number, max: number) => {
        dispatch(getPacksTC(page, pageSize, find, min, max))
    }
    const onChangeselect = (page: number, pageSize: number, find: string) => {
        dispatch(getPacksTC(page, pageSize, find))
    }

    /*if (cards.length > 1) {
        return <Redirect to={PATH.Cards}/>
    }*/
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
                        <th>Name</th>
                        <th>cardsCount</th>
                        <th>updated</th>
                        <th>bame</th>
                    </tr>
                    </thead>
                    {
                        packs && packs.map((t) =>
                            <tbody key={t._id}>
                            <tr key={t._id}>
                                <td>{t.user_name}</td>
                                <td onClick={() => {
                                    if (t.cardsCount > 0) {
                                        dispatch(getCardsTC(t._id))
                                    }


                                }}><NavLink to={PATH.Cards + t._id}>{t.cardsCount}</NavLink></td>
                                <td>{t.updated}</td>
                                <td>{t.name}</td>

                            </tr>
                            </tbody>
                        )}
                </table>
            </div>
            <div>{error}</div>
        </div>
    );
}

