import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../bll/store/store";
import {CardPacksType, CardsApiType} from "../dall/cardsApi";
import {getCardsTC, getPacksTC} from "../bll/PacksReducer";
import s from './Cards.module.css'
import {Paginations} from "./Pagination";
import l from '../../../common/c1-LoadingBar/Loading.module.css'


export function Cards() {
    const cards = useSelector<AppStoreType, CardsApiType[]>(state => state.packs.card)
    const isLoading = useSelector<AppStoreType, boolean>(state => state.packs.isLoading)
    const error = useSelector<AppStoreType, string>(state => state.recovery.error)
    const cardPacksTotalCount = useSelector<AppStoreType, number>(state => state.packs.cardPacksTotalCount)
    const pageSize = useSelector<AppStoreType, number>(state => state.packs.pageSize)
    const currentPage = useSelector<AppStoreType, number>(state => state.packs.currentPage)
    const dispatch = useDispatch()

    useEffect(() => {

    }, [])

debugger
    const findTitle = (page: number, pageSize: number, find: string) => {
        dispatch(getCardsTC( null,page, pageSize, find))
    }

    const chengedDoubleRange = (page: number, pageSize: number, find: string, min: number, max: number) => {
        dispatch(getCardsTC(null,page, pageSize, find, min, max))
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

/*
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../bll/store/store";
import {CardPacksType} from "../dall/cardsApi";
import {getCardsTC} from "../bll/PacksReducer";
import s from './Packs.module.css'
import {Pagination} from "@material-ui/lab";
import SuperDoubleRange from "../../../common/c8-SuperDoubleRange/SuperDoubleRange";


export function Packs() {
    const packs = useSelector<AppStoreType, CardPacksType[]>(state => state.packs.cardPacks)
    const dispatch = useDispatch()
    //
    const cardPacksTotalCount = useSelector<AppStoreType, number>(state => state.packs.cardPacksTotalCount)
    const pageSize = useSelector<AppStoreType, number>(state => state.packs.pageSize)
    const currentPage = useSelector<AppStoreType, number>(state => state.packs.currentPage)

    useEffect(() => {
        dispatch(getCardsTC(page, pageSize))
    }, [])


    //

    const pageCount = Math.ceil(cardPacksTotalCount / pageSize)
    const pages: number[] = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        dispatch(getCardsTC(page, pageSize, find))
    };

//
    const [find, setFind] = useState('')


    //

    const [value1, setValue1] = useState<number>(0);
    const [value2, setValue2] = useState<number>(20);

    const handleChangeValue = (value: number | number[]) => {
        if (Array.isArray(value)) {
            setValue1(value[0])
            setValue2(value[1])
        } else {
            setValue1(value)
        }

    }

    return (


        <div>
            <div>
                <SuperDoubleRange
                    value={[value1, value2]}
                    onChangeRange={handleChangeValue}
                />
                <button onClick={() => {
                    dispatch(getCardsTC(page, pageSize, find, value1, value2))
                }}>save
                </button>
            </div>


            <input value={find} onChange={(e) => setFind(e.currentTarget.value)} placeholder={'sd'}/>
            <button onClick={() => {
                dispatch(getCardsTC(page, pageSize, find))
            }}>find
            </button>


            {/!*<input onChange={(e) => {
                dispatch(getCardsTC(page, +e.currentTarget.value))
            }}/>*!/}
            <select onChange={e => dispatch(getCardsTC(page, Number(e.currentTarget.value), find))}>
                <option value={4}>4</option>
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
            </select>

            <Pagination count={pages.length} page={page} onChange={handleChange}/>


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
                            <td>{t.cardsCount}</td>
                            <td>{t.updated}</td>
                            <td>{t.name}</td>

                        </tr>
                        </tbody>
                    )}


            </table>
            <div>hi</div>

        </div>
    );
}*/
