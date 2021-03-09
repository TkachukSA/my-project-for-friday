import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "../reducers/profile-reducer";
import {authReducer} from "../reducers/auth-reducer";
import {RecoveryReducer} from "../../auth/recovery-password/RecoveryReducer";
import thunk from 'redux-thunk'


const reducers = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    recovery: RecoveryReducer
});

const store = createStore(reducers, applyMiddleware(thunk));
export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store; // for dev