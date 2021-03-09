import React, {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {forgotTC, isDoneType} from "./RecoveryReducer";
import {AppStoreType} from "../../bll/store/store";
import {Redirect} from 'react-router-dom';
import {PATH} from "../../header/Header";

export const RecoveryPassword = () => {
    const isDone = useSelector<AppStoreType, isDoneType>(state => state.recovery.isDone)
    const recoveryStatus = useSelector<AppStoreType, string>(state => state.recovery.recoveryStatus)
    const error = useSelector<AppStoreType, string>(state => state.recovery.error)
    const [value, setValue] = useState('crafta.net@gmail.com')


    const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const dispath = useDispatch()

    const sendEmail = () => {
        dispath(forgotTC(value))
    }

    if (isDone === 'inProgress') {
        return <Redirect to={PATH.NewPasswordPage}/>
    }
    return <>
        <div> Recovery Password</div>
        <div>{recoveryStatus}</div>
        <div>
            <form>
                <input value={value} onChange={onChange}/>
                <button onClick={sendEmail}>send</button>
            </form>
        </div>
        <div>{error}</div>

    </>

}


