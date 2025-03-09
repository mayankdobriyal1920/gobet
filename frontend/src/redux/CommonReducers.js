import {
    CHANGE_USER_AVATAR_MODAL,
    USER_BET_PREDICTION_HISTORY_REQUEST,
    USER_BET_PREDICTION_HISTORY_SUCCESS,
    USER_BET_PREDICTION_STATUS,
    USER_BET_PREDICTION_STATUS_EXPIRED,
    USER_BET_PREDICTION_STATUS_LOADING_REQUEST,
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
    USER_WALLET_AND_GAME_BALANCE_SUCCESS,
    USER_BET_PREDICTION_STATUS_READY,
    USER_BET_PREDICTION_STATUS_READY_TIMER,
    USER_WITHDRAWAL_AMOUNT_HISTORY_REQUEST,
    USER_WITHDRAWAL_AMOUNT_HISTORY_SUCCESS,
    USER_DEPOSIT_AMOUNT_HISTORY_REQUEST,
    USER_DEPOSIT_AMOUNT_HISTORY_SUCCESS,
    ADMIN_GAME_RESULT_LIST_REQUEST,
    ADMIN_GAME_RESULT_LIST_SUCCESS,
    PENDING_WITHDRAWAL_REQUEST_LIST_SUCCESS,
    PENDING_WITHDRAWAL_REQUEST_LIST_REQUEST,
    ALL_USERS_UNDER_SUB_ADMIN_LIST_REQUEST,
    ALL_USERS_UNDER_SUB_ADMIN_LIST_SUCCESS,
    USER_GAME_HISTORY_REQUEST,
    USER_GAME_HISTORY_SUCCESS,
    PENDING_DEPOSIT_REQUEST_LIST_SUCCESS,
    PENDING_DEPOSIT_REQUEST_LIST_REQUEST,
    GENERATED_PASSCODE_LIST_BY_ADMIN_REQUEST,
    GENERATED_PASSCODE_LIST_BY_ADMIN_SUCCESS,
    USER_GET_OTP_REQUEST,
    PASSCODE_REQUEST_BY_SUB_ADMIN_REQUEST,
    PASSCODE_REQUEST_BY_SUB_ADMIN_SUCCESS,
    ALL_USERS_NORMAL_AND_SUB_ADMIN_LIST_REQUEST,
    ALL_USERS_NORMAL_AND_SUB_ADMIN_LIST_SUCCESS,
    USER_MONEY_TRANSACTIONS_REQUEST,
    USER_MONEY_TRANSACTIONS_SUCCESS,
    NEAREST_GAME_SESSION_AND_ACTIVE_SESSION_REQUEST,
    NEAREST_GAME_SESSION_AND_ACTIVE_SESSION_SUCCESS,
    BET_ACTIVE_USER_SUCCESS,
    BET_ACTIVE_USER_REQUEST,
    BET_GAME_SESSION_REQUEST, BET_GAME_SESSION_SUCCESS, GET_GAME_LAST_RESULT_REQUEST, GET_GAME_LAST_RESULT_SUCCESS
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

export const betActiveUserDataReducer = (state = {}, action) => {
    switch (action.type) {
        case BET_ACTIVE_USER_REQUEST:
            return { loading: true };
        case BET_ACTIVE_USER_SUCCESS:
            return { loading: false, activeUserData: action.payload };
        default:
            return state;
    }
};

export const betGameSessionDataReducer = (state = {}, action) => {
    switch (action.type) {
        case BET_GAME_SESSION_REQUEST:
            return { loading: true };
        case BET_GAME_SESSION_SUCCESS:
            return { loading: false, sessionData: action.payload };
        default:
            return state;
    }
};

export const gameLastResultReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_GAME_LAST_RESULT_REQUEST:
            return { loading: true };
        case GET_GAME_LAST_RESULT_SUCCESS:
            return { loading: false, gameResult: action.payload };
        default:
            return state;
    }
};

export const userWalletAndGameBalanceReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_WALLET_AND_GAME_BALANCE_REQUEST:
            return { loading: true,walletBalance:0,gameBalance:0,bettingBalance:0};
        case USER_WALLET_AND_GAME_BALANCE_SUCCESS:
            return { loading: false, walletBalance: action.payload.wallet_balance,gameBalance:action.payload.game_balance,bettingBalance:action.payload.betting_balance };
        default:
            return state;
    }
};

export const userBetPredictionHistoryReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_BET_PREDICTION_HISTORY_REQUEST:
            return { loading: true,predictionHistory:[]};
        case USER_BET_PREDICTION_HISTORY_SUCCESS:
            return { loading: false, predictionHistory: action.payload};
        default:
            return state;
    }
};

export const nearestGameSessionAndActiveSessionReducer = (state = {}, action) => {
    switch (action.type) {
        case NEAREST_GAME_SESSION_AND_ACTIVE_SESSION_REQUEST:
            return { loading: true,gameSessionData:{}};
        case NEAREST_GAME_SESSION_AND_ACTIVE_SESSION_SUCCESS:
            return { loading: false, gameSessionData: action.payload};
        default:
            return state;
    }
};

export const passcodeRequestBySubAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case PASSCODE_REQUEST_BY_SUB_ADMIN_REQUEST:
            return { loading: true};
        case PASSCODE_REQUEST_BY_SUB_ADMIN_SUCCESS:
            return { loading: false, passcodeRequest: action.payload};
        default:
            return state;
    }
};
export const userWithdrawalAmountHistoryReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_WITHDRAWAL_AMOUNT_HISTORY_REQUEST:
            return { loading: true};
        case USER_WITHDRAWAL_AMOUNT_HISTORY_SUCCESS:
            return { loading: false, withdrawalHistory: action.payload};
        default:
            return state;
    }
};
export const userDepositAmountHistoryReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DEPOSIT_AMOUNT_HISTORY_REQUEST:
            return { loading: true};
        case USER_DEPOSIT_AMOUNT_HISTORY_SUCCESS:
            return { loading: false, depositHistory: action.payload};
        default:
            return state;
    }
};

export const userGameHistoryReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_GAME_HISTORY_REQUEST:
            return { loading: true};
        case USER_GAME_HISTORY_SUCCESS:
            return { loading: false, gameHistory: action.payload};
        default:
            return state;
    }
};

export const userMoneyTransactionsReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_MONEY_TRANSACTIONS_REQUEST:
            return { loading: true};
        case USER_MONEY_TRANSACTIONS_SUCCESS:
            return { loading: false, moneyTransactions: action.payload};
        default:
            return state;
    }
};

export const adminGameResultListReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_GAME_RESULT_LIST_REQUEST:
            return { loading: true};
        case ADMIN_GAME_RESULT_LIST_SUCCESS:
            return { loading: false, gameResult: action.payload};
        default:
            return state;
    }
};

export const allUsersUnsetSubAdminListReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_USERS_UNDER_SUB_ADMIN_LIST_REQUEST:
            return { loading: true};
        case ALL_USERS_UNDER_SUB_ADMIN_LIST_SUCCESS:
            return { loading: false, userData: action.payload};
        default:
            return state;
    }
};

export const allUsersNormalAndSunAdminListReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_USERS_NORMAL_AND_SUB_ADMIN_LIST_REQUEST:
            return { loading: true};
        case ALL_USERS_NORMAL_AND_SUB_ADMIN_LIST_SUCCESS:
            return { loading: false, userData: action.payload};
        default:
            return state;
    }
};


export const pendingWithdrawalRequestListReducer = (state = {}, action) => {
    switch (action.type) {
        case PENDING_WITHDRAWAL_REQUEST_LIST_REQUEST:
            return { loading: true};
        case PENDING_WITHDRAWAL_REQUEST_LIST_SUCCESS:
            return { loading: false, withdrawalRequest: action.payload};
        default:
            return state;
    }
};
export const pendingDepositRequestListReducer = (state = {}, action) => {
    switch (action.type) {
        case PENDING_DEPOSIT_REQUEST_LIST_REQUEST:
            return { loading: true};
        case PENDING_DEPOSIT_REQUEST_LIST_SUCCESS:
            return { loading: false, depositRequest: action.payload};
        default:
            return state;
    }
};

export const generatedPasscodeListByAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case GENERATED_PASSCODE_LIST_BY_ADMIN_REQUEST:
            return { loading: true};
        case GENERATED_PASSCODE_LIST_BY_ADMIN_SUCCESS:
            return { loading: false, passcodeList: action.payload};
        default:
            return state;
    }
};
export const userBetPredictionStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_BET_PREDICTION_STATUS_LOADING_REQUEST:
            return {status: 0,prediction:{},timer:60 - new Date().getSeconds(),dateTime:new Date()};
        case USER_BET_PREDICTION_STATUS:
            return {status: 1,prediction:action.payload,timer:60 - new Date().getSeconds(),dateTime:new Date()};
        case USER_BET_PREDICTION_STATUS_TIMER:
            return {status: state.status,prediction:state.prediction,dateTime:state.dateTime,timer:action.payload};
        default:
            return state;
    }
};

export const userOtpReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_GET_OTP_REQUEST:
            return { loading: true };
        case USER_GET_OTP_REQUEST_SUCCESS:
            return { loading: false };
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