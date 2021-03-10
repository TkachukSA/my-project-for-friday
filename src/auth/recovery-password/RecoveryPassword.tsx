import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {forgotTC, isDoneType} from "./RecoveryReducer";
import {AppStoreType} from "../../bll/store/store";
import {Redirect} from 'react-router-dom';
import {PATH} from "../../header/Header";
import {useFormik} from "formik";


export const RecoveryPassword = () => {

    // isDone - статус восстоновления пароля
    // изначально - 'false' (при переходе на страницу recovertPassword)
    // статус меняйется на - 'inProgress' если пользователь ввел верный email и пришел положительный ответ от сервера
    // статус меняйется на - 'true'  когда ввели новый пароль и есть актуальный токен
    const isDone = useSelector<AppStoreType, isDoneType>(state => state.recovery.isDone)

    // показывает 'loading' перед отправкой на сервер, и выдает инфу об статусе запроса с сервера
    const recoveryStatus = useSelector<AppStoreType, string>(state => state.recovery.messangeRecInfo)

    // обработка ошибок (показывается если что-то пошло не так)
    const error = useSelector<AppStoreType, string>(state => state.recovery.error)
    const dispatch = useDispatch()


    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            const errors: { email?: string } = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(forgotTC(values.email))
            formik.resetForm()
        },
    })

    // redirect
    if (isDone === 'inProgress') {
        return <Redirect to={PATH.NewPasswordPage}/>
    }
    return <>

        <div> Recovery Password</div>

        <div>{recoveryStatus}</div>
        <form onSubmit={formik.handleSubmit}>
            <div> please enter your email</div>
            <div>
                <input type={"text"} {...formik.getFieldProps("email")} placeholder={"Email"}
                       onBlur={formik.handleBlur}/>

                {formik.touched.email && formik.errors.email
                    ? <div style={{color: "red"}}>{formik.errors.email}</div>
                    : null}
            </div>
            <div>
                <button type={"submit"}>Send</button>
            </div>
            <div>{error}</div>
        </form>

    </>

}


