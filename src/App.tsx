import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import {Login} from "./auth/login/Login";
import {RecoveryPassword} from "./auth/recovery-password /RecoveryPassword";
import {NewPassword} from "./auth/recovery-password /NewPassword";
import {Registration} from "./auth/registration/Registration";
import PreJunior from "./pages/PreJunior";
import {Error404} from "./pages/Error404";
import {Profile} from "./profile/Profile";
import Header, {PATH} from "./header/Header";


function App() {

    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route path={PATH.loginPage} render={() => <Login/>}/>
                <Route path={PATH.RecoveryPasswordPage} render={() => <RecoveryPassword/>}/>
                <Route path={PATH.NewPasswordPage} render={() => <NewPassword/>}/>
                <Route path={PATH.RegistrationPage} render={() => <Registration/>}/>
                <Route path={PATH.PreJuniorPage} render={() => <PreJunior/>}/>
                <Route exact path={PATH.Main} render={() => <Profile/>}/>
                <Route path={PATH.ErrorPage} render={() => <Error404/>}/>
                <Redirect from={PATH.Redirect} to={'/404'}/>
            </Switch>

        </div>
    );
}

export default App;
