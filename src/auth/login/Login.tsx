import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store/store";
import {Redirect} from "react-router-dom";
import {logInTC} from '../../bll/reducers/Login-Reducer';
import {useFormik} from 'formik';
import s from './Login.module.css'
import l from   '../../common/c1-LoadingBar/Loading.module.css'

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.logIn.isLoginIn)
    const errorMessage = useSelector<AppStoreType, string | null>(state => state.app.error)
    const loadingStatus = useSelector<AppStoreType, string | null>(state => state.app.status)


    const formik = useFormik({
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password.length) {
                errors.password = "Enter password"
            }

            return errors;
        },
        initialValues: {
            email: 'nya-admin@nya.nya',
            password: '1qazxcvBG',
            rememberMe: false
        }, onSubmit: values => {
            dispatch(logInTC(values))
        },

    })
    if (isLoggedIn) {

        return <Redirect to={'/'}/>
    }

    if(loadingStatus==='loading'){
        return <div className={l.loader}>Loading...</div>
    }

    return (
        <form onSubmit={formik.handleSubmit}>

            <div className={s.wrapper}>
                <input type={"text"}  {...formik.getFieldProps("email")} placeholder={"Email"}
                       onBlur={formik.handleBlur}/>

                {formik.touched.email && formik.errors.email
                    ? <div style={{color: "red"}}>{formik.errors.email}</div>
                    : null}

                <input type={"password"}
                       placeholder={"Password"} {...formik.getFieldProps("password")} onBlur={formik.handleBlur}/>

                {formik.touched.password && formik.errors.password
                    ? <div style={{color: "red"}}>{formik.errors.password}</div>
                    : null}

                <div>
                    <input type="checkbox"
                           checked={formik.values.rememberMe} {...formik.getFieldProps('rememberMe')}/>

                    <span>Remember me</span>

                </div>
                <button type={'submit'}>Login</button>
            </div>
            <div>{errorMessage && errorMessage}</div>
        </form>

    )
}


