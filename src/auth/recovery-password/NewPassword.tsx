import React from 'react'
import {Redirect, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {isDoneType, newPasswordTC} from "./RecoveryReducer";
import {AppStoreType} from "../../bll/store/store";
import {PATH} from "../../header/Header";
import {useFormik} from "formik";

type FormikErrorType = {
    password?: string
    secondPassword?: string
}

export const NewPassword = () => {

    const error = useSelector<AppStoreType, string>(state => state.recovery.error)
    const isDone = useSelector<AppStoreType, isDoneType>(state => state.recovery.isDone)
    const recoveryStatus = useSelector<AppStoreType, string>(state => state.recovery.messangeRecInfo)

    const dispatch = useDispatch()
    const {token} = useParams<Record<string, string | undefined>>();

    const tokenValue = token ? token : ''

    const formik = useFormik({
        initialValues: {
            password: '',
            secondPassword: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (values.password !== values.secondPassword) {
                errors.secondPassword = 'password mismatch'
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 7) {
                errors.password = 'enter the passvord length 7';
            }
            if (!values.secondPassword) {
                errors.secondPassword = 'Required';
            } else if (values.secondPassword.length < 7) {
                errors.secondPassword = 'enter the passvord length 7';
            }
            return errors;
        },

        onSubmit: values => {
            dispatch(newPasswordTC(values.password, tokenValue))
            formik.resetForm()
        },

    })


    if (isDone === 'true') {
        return <Redirect to={PATH.loginPage}/>
    }

    return <>
        <div> new Password</div>
        <div>{recoveryStatus}</div>
        <form onSubmit={formik.handleSubmit}>
            <div>
                <div>
                    <input type={"text"}
                           {...formik.getFieldProps("password")}
                           placeholder={"Password"}
                           onBlur={formik.handleBlur}/>

                    {formik.touched.password && formik.errors.password ?
                        <div style={{color: "red"}}>{formik.errors.password}</div> : null}
                </div>

                <div>
                    <input type={"text"}
                           {...formik.getFieldProps("secondPassword")}
                           placeholder={"Password"}
                           onBlur={formik.handleBlur}/>

                    {formik.touched.secondPassword && formik.errors.secondPassword ?
                        <div style={{color: "red"}}>{formik.errors.secondPassword}</div> : null}
                </div>
            </div>
            <div>
                <button type={"submit"}>Send</button>
            </div>
            <div>{error}</div>
        </form>

    </>

}