import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {logOutTC} from "../bll/reducers/Login-Reducer";
import {AppStoreType} from "../bll/store/store";
import {Redirect} from "react-router-dom";

export const Profile = () => {
    const dispatch = useDispatch()
    const userProfile = useSelector<AppStoreType>(state => state.profile)
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.logIn.isLoginIn)
    const errorMessage = useSelector<AppStoreType, string | null>(state => state.app.error)

    if(!isLoggedIn){
       return <Redirect to={'/login'}/>
    }

    const logOut = () => {
        dispatch(logOutTC())
    }
console.log(userProfile)

    return (
        <div>
            <div> Profile page</div>
            {/*<img src="userProfile.avatar" alt=""/>*/}
            <button onClick={logOut}>LogOut</button>
            <div>{errorMessage && errorMessage}</div>
        </div>
    )
}