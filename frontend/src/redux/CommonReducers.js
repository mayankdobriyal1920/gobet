import {
    CHANGE_USER_AVATAR_MODAL, USER_BET_PREDICTION_HISTORY_REQUEST, USER_BET_PREDICTION_HISTORY_SUCCESS,
    USER_BET_PREDICTION_STATUS, USER_BET_PREDICTION_STATUS_EXPIRED, USER_BET_PREDICTION_STATUS_LOADING_REQUEST,
    USER_BET_PREDICTION_STATUS_WAITING,
    USER_BET_PREDICTION_STATUS_TIMER,
    USER_GET_OTP_REQUEST_FAIL,
    USER_GET_OTP_REQUEST_SUCCESS,
    USER_SESSION_REQUEST,
    USER_SESSION_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT,
    USER_SIGNUP_SIGNIN_ERROR,
    USER_WALLET_AND_GAME_BALANCE_REQUEST,
    USER_WALLET_AND_GAME_BALANCE_SUCCESS, USER_BET_PREDICTION_STATUS_READY, USER_BET_PREDICTION_STATUS_READY_TIMER
} from "./CommonConstants";

export const userAuthDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_SIGNOUT:
            return { loading: false, userInfo: {}};
        default:
            return state;
    }
};

export const userSessionReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SESSION_REQUEST:
            return { loading: true };
        case USER_SESSION_SUCCESS:
            return { loading: false, success: action.payload };
        default:
            return state;
    }
};

export const userWalletAndGameBalanceReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_WALLET_AND_GAME_BALANCE_REQUEST:
            return { loading: true,walletBalance:0,gameBalance:0};
        case USER_WALLET_AND_GAME_BALANCE_SUCCESS:
            return { loading: false, walletBalance: action.payload.wallet_balance,gameBalance:action.payload.game_balance };
        default:
            return state;
    }
};

export const userBetPredictionHistoryReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_BET_PREDICTION_HISTORY_REQUEST:
            return { loading: true};
        case USER_BET_PREDICTION_HISTORY_SUCCESS:
            return { loading: false, predictionHistory: action.payload};
        default:
            return state;
    }
};
export const userBetPredictionStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_BET_PREDICTION_STATUS_LOADING_REQUEST:
            return {loading:true,status: 0,prediction:state.prediction,timer:60,dateTime:state.dateTime};
        case USER_BET_PREDICTION_STATUS_EXPIRED:
            return {loading:false,status: 5,prediction:state.prediction,timer:60,dateTime:state.dateTime};
        case USER_BET_PREDICTION_STATUS_WAITING:
            return {loading:false,status: 3,prediction:state.prediction,timer:60,dateTime:state.dateTime};
        case USER_BET_PREDICTION_STATUS_READY:
            return {loading:false,status: 2,prediction:state.prediction,readyState:120,readyStateDateTime:new Date(),timer:60,dateTime:state.dateTime};
        case USER_BET_PREDICTION_STATUS:
            return {loading:false,status: 1,prediction:state.payload,timer:60,dateTime:new Date()};
        case USER_BET_PREDICTION_STATUS_READY_TIMER:
            return {loading:false,status: state.status,prediction:state.prediction,dateTime:state.dateTime,readyStateDateTime:state.readyStateDateTime,timer:60,readyState:action.payload};
        case USER_BET_PREDICTION_STATUS_TIMER:
            return {loading:false,status: state.status,prediction:state.prediction,dateTime:state.dateTime,timer:action.payload};
        default:
            return state;
    }
};

export const userOtpReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_GET_OTP_REQUEST_SUCCESS:
            return { loading: true };
        case USER_GET_OTP_REQUEST_FAIL:
            return { loading: false };
        default:
            return state;
    }
};

export const signupSigninFormError = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNUP_SIGNIN_ERROR:
            return { error: action.payload.error,  message: action.payload.message};
        default:
            return state;
    }
};

export const changeUserAvatarModal = (state = {}, action) => {
    switch (action.type) {
        case CHANGE_USER_AVATAR_MODAL:
            return { open: action.payload.open};
        default:
            return state;
    }
};