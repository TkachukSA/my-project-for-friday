import React, {useState} from "react";
import {Pagination} from "@material-ui/lab";
import SuperDoubleRange from "../../../common/c8-SuperDoubleRange/SuperDoubleRange";
import s from'./Pagination.module.css'

type PaginationType = {
    cardPacksTotalCount: number
    pageSize: number
    findTitle: (page: number, pageSize: number, find: string) => void
    chengedDoubleRange: (page: number, pageSize: number, find: string, min: number, max: number) => void
    onChangeselect: (page: number, pageSize: number, find: string) => void
}
export const Paginations: React.FC<PaginationType> = ({
              cardPacksTotalCount, pageSize,
              findTitle, chengedDoubleRange, onChangeselect

}) => {

    const pageCount = Math.ceil(cardPacksTotalCount / pageSize)
    const pages: number[] = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    const [page, setPage] = React.useState(1);
    const [find, setFind] = useState('')
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
    const onClickButtonFind =()=>{
        findTitle(page, pageSize, find)
        setFind('')
    }
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        findTitle(page, pageSize, find)
    };
    return <>
        <div className={s.paginationContainer}>
            <div className={s.blockFinde}>
                <div>
                    <input value={find}
                           onChange={(e) => setFind(e.currentTarget.value)}
                           placeholder={'sd'}/>
                    <button onClick={onClickButtonFind}>
                        find
                    </button>
                </div>
                <div className={s.test}>
                    <SuperDoubleRange
                        value={[value1, value2]}
                        onChangeRange={handleChangeValue}
                    />
                    <button onClick={() => {
                        chengedDoubleRange(page, pageSize, find, value1, value2)
                    }}>save
                    </button>
                </div>
            </div>


            <div className={s.blockPagination}>
                <div>
                    <Pagination count={pages.length} page={page} onChange={handleChange}/>
                </div>
                <div>
                    <select onChange={e => onChangeselect(page, Number(e.currentTarget.value), find)}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>


        </div>


    </>
}
