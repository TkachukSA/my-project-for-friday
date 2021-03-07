import React from 'react'
import s from "./Registration.module.css"


export const Registration = () => {
    return (<div className={s.wrapper}>
        <input type={"text"} placeholder={"Email"}/>
        <input type={"text"} placeholder={"Password"}/>
        <button className={s.btn}>Register</button>
    </div>)

}