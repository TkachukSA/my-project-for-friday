import React from 'react';
import {Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import {Login} from "./auth/login/Login";
import {RecoveryPassword} from "./auth/recovery-password /RecoveryPassword";
import {NewPassword} from "./auth/recovery-password /NewPassword";
import {Registration} from "./auth/registration/Registration";
import PreJunior from "./pages/PreJunior";
import {Error404} from "./pages/Error404";
import {Profile} from "./profile/Profile";


function App() {

    return (
        <div className="App">
            <Switch>
                <Route path={'/login'} render={() => <Login/>}/>
                <Route path={'/passwordrec'} render={() => <RecoveryPassword/>}/>
                <Route path={'/newpassword'} render={() => <NewPassword/>}/>
                <Route path={'/Registration'} render={() => <Registration/>}/>
                <Route path={'/PreJunior'} render={() => <PreJunior/>}/>
                <Route exact path={'/'} render={() => <Profile/>}/>
                <Route path={'/404'} render={() => <Error404/>}/>
                <Redirect from={'*'} to={'/404'}/>
            </Switch>

        </div>
    );
}

export default App;
