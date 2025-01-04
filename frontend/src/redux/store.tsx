import { createStore, compose, applyMiddleware,combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import {
    changeUserAvatarModal,
    signupSigninFormError,
    userAuthDetailReducer,
    userOtpReducer,
    userSessionReducer, userWalletAndGameBalanceReducer
} from './CommonReducers';

const initialState = {
    userSession: {loading: true, status:0},
    userAuthDetail: {userInfo: null, loading:false},
    userOtpDetails: {loading: false},
    signupSigninFormError: {},
    changeUserAvatarModal: {open:false},
    userWalletAndGameBalance: {loading:true,walletBalance:0,gameBalance:0},
}
export const rootReducer = combineReducers({
    userSession: userSessionReducer,
    userAuthDetail: userAuthDetailReducer,
    userOtpDetails: userOtpReducer,
    signupSigninFormError: signupSigninFormError,
    changeUserAvatarModal: changeUserAvatarModal,
    userWalletAndGameBalance: userWalletAndGameBalanceReducer,
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancer =  window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const store = createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
export type RootState = ReturnType<typeof rootReducer>
export default store;
