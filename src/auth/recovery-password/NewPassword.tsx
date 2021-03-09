import React, {ChangeEvent, useState} from 'react'
import {Redirect, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {isDoneType, newPasswordTC} from "./RecoveryReducer";
import {AppStoreType} from "../../bll/store/store";
import {PATH} from "../../header/Header";

export const NewPassword = () => {
    const [firstValue, setFirstValue] = useState('')
    const [secondValue, setSecondValue] = useState('')
    const {token} = useParams<Record<string, string | undefined>>();
    const dispath = useDispatch()
    const error = useSelector<AppStoreType, string>(state => state.recovery.error)
    const isDone = useSelector<AppStoreType, isDoneType>(state => state.recovery.isDone)
    const recoveryStatus = useSelector<AppStoreType, string>(state => state.recovery.recoveryStatus)

//asa121asa!!

    const onChangeFirstValue = (e: ChangeEvent<HTMLInputElement>) => setFirstValue(e.currentTarget.value)
    const onChangeSecondValue = (e: ChangeEvent<HTMLInputElement>) => setSecondValue(e.currentTarget.value)


    const tokenValue = token ? token : ''
    let incorrectValue
    const password = firstValue === secondValue ? firstValue : incorrectValue = 'the entered data does not match'

    const sendNewPassoword = () => {
        dispath(newPasswordTC(password, tokenValue))
    }

    if (isDone === 'true') {
        return <Redirect to={PATH.loginPage}/>
    }
    return <>
        <div> new Password</div>
        <div>
            <div>{recoveryStatus}</div>
            <form>
                <div>
                    new password: <input value={firstValue} onChange={onChangeFirstValue}/>
                </div>
                <div>
                    new password: <input value={secondValue} onChange={onChangeSecondValue}/>
                </div>
                <button disabled={incorrectValue === 'the entered data does not match'}
                        onClick={sendNewPassoword}>send
                </button>
            </form>
            {incorrectValue}
            <div>{error}</div>
        </div>
    </>

}