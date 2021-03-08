import React from 'react'
import s from "./Registration.module.css"
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {RegistrationStateType, registrationTC} from '../../bll/reducers/registration-reducer';
import {AppStoreType} from '../../bll/store/store';
import {Redirect} from 'react-router-dom';


type FormikErrorType = {
    email?: string
    password?: string
    confirmedPassword?: string
}


export const Registration = () => {
    const state = useSelector<AppStoreType, RegistrationStateType>(state => state.registration)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmedPassword: ''
        }, validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (values.password.length <= 8) {
                errors.password = "password must be 8 characters long"
            }
            if (values.password !== values.confirmedPassword) {
                errors.confirmedPassword = "Password mismatch"
            }
            return errors;
        },

        onSubmit: values => {
            dispatch(registrationTC({email: values.email, password: values.password}))
            formik.resetForm()
        },
    })
    if (state.redirect) {
        return (<Redirect to={"/login"}/>)
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={s.wrapper}>
                <input className={s.input} type={"text"} {...formik.getFieldProps("email")} placeholder={"Email"}
                       onBlur={formik.handleBlur}/>

                {formik.touched.email && formik.errors.email
                    ? <div style={{color: "red"}}>{formik.errors.email}</div>
                    : null}

                <input className={s.input} type={"password"}
                       placeholder={"Password"} {...formik.getFieldProps("password")} onBlur={formik.handleBlur}/>

                {formik.touched.password && formik.errors.password
                    ? <div style={{color: "red"}}>{formik.errors.password}</div>
                    : null}

                <input className={s.input} type={"password"} placeholder={" Confirm password"}
                       {...formik.getFieldProps("confirmedPassword")} onBlur={formik.handleBlur}/>

                {formik.touched.confirmedPassword && formik.errors.confirmedPassword
                    ? <div style={{color: "red"}}>{formik.errors.confirmedPassword}</div>
                    : null}

                <button type={"submit"} className={s.btn}>Sign up</button>

                <div>{state.error}</div>
            </div>
        </form>
    )
}