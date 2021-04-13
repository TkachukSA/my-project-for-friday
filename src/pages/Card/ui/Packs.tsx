import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../bll/store/store";
import {CardPacksType, packsAPI} from "../dall/cardsApi";
import {addPackTC, getPacksTC} from "../bll/PacksReducer";
import s from './Packs.module.css'
import {Paginations} from "./Pagination";
import l from '../../../common/c1-LoadingBar/Loading.module.css'
import {NavLink} from "react-router-dom";
import {PATH} from "../../../header/Header";
import {getCardsTC} from "../bll/CardsReducer";
import {InitialStateType, UserType} from "../../../bll/reducers/profile-reducer";


export function Packs() {
    const packs = useSelector<AppStoreType, CardPacksType[]>(state => state.packs.cardPacks)

    const isLoading = useSelector<AppStoreType, boolean>(state => state.packs.isLoading)
    const error = useSelector<AppStoreType, string>(state => state.recovery.error)
    const cardPacksTotalCount = useSelector<AppStoreType, number>(state => state.packs.cardPacksTotalCount)
    const pageSize = useSelector<AppStoreType, number>(state => state.packs.pageSize)
    const currentPage = useSelector<AppStoreType, number>(state => state.packs.currentPage)
    const id = useSelector<AppStoreType>(state => state.profile.user._id)
    const dispatch = useDispatch()

    const [value, setValue] = useState('')


    useEffect(() => {


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


    const onChangeValue = (e: ChangeEvent<HTMLInputElement>)=>{
        setValue(e.currentTarget.value)}
        debugger
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


                <input value={value} onChange={onChangeValue}/> <button onClick={()=>dispatch(addPackTC(value))}>add</button>
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
                                <button disabled={id !==t.user_id}>upd</button>
                                <button disabled={id !==t.user_id}>delite</button>

                            </tr>
                            </tbody>
                        )}
                </table>
            </div>
            <div>{error}</div>
        </div>
    );
}

