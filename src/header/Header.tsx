import React from 'react';
import {NavLink, Switch} from 'react-router-dom';
import style from './Header.module.css'

export const PATH = {
    loginPage: "/login",
    RecoveryPasswordPage: "/recoverypassword",
    NewPasswordPage: "/newpassword",
    RegistrationPage: "/registration",
    PreJuniorPage: "/prejunior",
    ErrorPage: "/404",
    Main: "/",
    Redirect: "*"

    // add paths
}

function Header() {

    return (
        <div className={style.header}>
            <Switch>
                <div className={style.nav}>
                    <ul>
                        <li><NavLink to={PATH.loginPage}>Login</NavLink></li>
                        <li><NavLink to={PATH.RecoveryPasswordPage}>Reacovery Password</NavLink></li>
                        <li><NavLink to={PATH.NewPasswordPage}>New Password</NavLink></li>
                        <li><NavLink to={PATH.RegistrationPage}>Registration</NavLink></li>
                        <li><NavLink to={PATH.PreJuniorPage}>PreJunior</NavLink></li>
                        <li><NavLink to={PATH.ErrorPage}>Error Page</NavLink></li>
                    </ul>
                </div>
            </Switch>
        </div>
    );
}

export default Header;
