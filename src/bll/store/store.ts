import {combineReducers, createStore} from "redux";
import {profileReducer} from "../reducers/profile-reducer";
import {authReducer} from "../reducers/auth-reducer";


const reducers = combineReducers({
    profile: profileReducer,
    auth: authReducer
});

const store = createStore(reducers);
export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store; // for dev