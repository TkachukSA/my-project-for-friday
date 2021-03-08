import React from 'react'
import s from "./Registration.module.css"

type RegistrationStateType = {
    newEmail: string,
    newPassword: string,
    confirmedPassword: string
}


const RegistrationState: RegistrationStateType = {
    newEmail: "Haravoy1998@mail.ru",
    newPassword: "123456789",
    confirmedPassword: "123456789"
}

export const Registration = () => {
    return (<div className={s.wrapper}>
        <input className={s.input} type={"text"} placeholder={"Email"} value={RegistrationState.newEmail}/>
        <input className={s.input} type={"password"} placeholder={"Password"} value={RegistrationState.newPassword}/>
        <input className={s.input} type={"password"} placeholder={" Confirm password"} value={RegistrationState.confirmedPassword}/>
        <button className={s.btn}>Register</button>
    </div>)
}