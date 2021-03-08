import React from 'react'
import s from "./Registration.module.css"
import {useFormik} from "formik";

type FormikErrorType = {
    email?: string
    password?: string
    confirmedPassword?: string
}


export const Registration = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmedPassword: ''
        },validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },

        onSubmit: values => {
            alert(JSON.stringify(values));
            formik.resetForm()
        },
    })


    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={s.wrapper}>
            <input className={s.input} type={"text"} {...formik.getFieldProps("email")} placeholder={"Email"}
                   onBlur={formik.handleBlur}/>
                {formik.touched.email && formik.errors.email ? <div style={{color:"red"}}>{formik.errors.email}</div> :null }
            <input className={s.input} type={"password"} placeholder={"Password"} {...formik.getFieldProps("password")}/>
            <input className={s.input} type={"password"} placeholder={" Confirm password"}
                   {...formik.getFieldProps("confirmedPassword")}/>
            <button className={s.btn}>Sign up</button>  </div>
        </form>
  )
}