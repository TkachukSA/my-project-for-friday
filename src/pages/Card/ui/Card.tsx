import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../bll/store/store";
import {CardPacksType} from "../dall/cardsApi";
import {getCardsTC} from "../bll/PacksReducer";
import s from './Card.module.css'
import {Pagination} from "@material-ui/lab";





export function Card() {
    const packs = useSelector<AppStoreType, CardPacksType[]>(state => state.packs.cardPacks)
    const cardPacksTotalCount = useSelector<AppStoreType, number>(state => state.packs.cardPacksTotalCount)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCardsTC(2))
    }, [])


    //

    const pageCount = Math.ceil(cardPacksTotalCount / 15)
    const pages:number[] = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        debugger
        setPage(value);
        dispatch(getCardsTC(page))
    };


//

    return (



        <div>


            <Pagination count={pages.length} page={page} onChange={handleChange} />
            {/*{
                pages.map(t=>{
                    return (
                        <Pagination count={t} key={t} onClick={()=>{dispatch(getCardsTC(t))}}/>
                        )

                })
            }*/}


            {/*<Pagination
                count={pages.length}
                 onChange={(e)=>{pages.map(t =>{
                    return dispatch(getCardsTC(t))})
                }}/>*/}







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
}

