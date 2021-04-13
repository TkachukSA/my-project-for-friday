import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import {Login} from "./auth/login/Login";
import {Registration} from "./auth/registration/Registration";
import PreJunior from "./pages/PreJunior";
import {Error404} from "./pages/Error404";
import {Profile} from "./profile/Profile";
import Header, {PATH} from "./header/Header";
import {RecoveryPassword} from "./auth/recovery-password/RecoveryPassword";
import {NewPassword} from "./auth/recovery-password/NewPassword";
import {Packs} from "./pages/Card/ui/Packs";
import {Cards} from "./pages/Card/ui/Cards";
import {initializeTC} from "./bll/reducers/appReducer";
import {useDispatch} from "react-redux";


function App() {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(initializeTC())
    })
    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route path={PATH.loginPage} render={() => <Login/>}/>
                <Route path={PATH.RecoveryPasswordPage} render={() => <RecoveryPassword/>}/>
                <Route path={PATH.NewPasswordPage} render={() => <NewPassword/>}/>
                <Route path={PATH.RegistrationPage} render={() => <Registration/>}/>
                <Route path={PATH.Packs} render={() => <Packs/>}/>
                <Route path={PATH.Cards} render={() => <Cards/>}/>
                <Route path={PATH.PreJuniorPage} render={() => <PreJunior/>}/>
                <Route exact path={PATH.Main} render={() => <Profile/>}/>
                <Route path={PATH.ErrorPage} render={() => <Error404/>}/>
                <Redirect from={PATH.Redirect} to={'/404'}/>
            </Switch>
        </div>
    );
}

export default App;
