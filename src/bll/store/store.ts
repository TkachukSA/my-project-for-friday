import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "../reducers/profile-reducer";
import {authReducer} from "../reducers/auth-reducer";
import {registrationReducer} from "../reducers/registration-reducer";
import thunkMiddleware from 'redux-thunk'


const reducers = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    registration: registrationReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store; // for dev