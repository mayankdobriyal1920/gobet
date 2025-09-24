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
    BET_GAME_SESSION_REQUEST,
    BET_GAME_SESSION_SUCCESS,
    GET_GAME_LAST_RESULT_REQUEST,
    GET_GAME_LAST_RESULT_SUCCESS,
    USER_SUBSCRIPTION_DATA_REQUEST,
    USER_SUBSCRIPTION_DATA_SUCCESS,
    APP_SUBSCRIPTION_PLAN_REQUEST,
    APP_SUBSCRIPTION_PLAN_SUCCESS,
    GAME_SESSION_AND_ALL_SESSION_REQUEST,
    GAME_SESSION_AND_ALL_SESSION_SUCCESS,
    GET_ALL_GAME_PLATFORMS_REQUEST,
    GET_ALL_GAME_PLATFORMS_SUCCESS,
    ADMIN_DASHBOARD_ALL_COUNT_DATA_REQUEST,
    ADMIN_DASHBOARD_ALL_COUNT_DATA_SUCCESS,
    ALL_USERS_SUBSCRIPTION_DATA_REQUEST,
    ALL_USERS_SUBSCRIPTION_DATA_SUCCESS,
    ADMIN_ORDER_AND_VALUE_COUNT_DATA_REQUEST,
    ADMIN_ORDER_AND_VALUE_COUNT_DATA_SUCCESS,
    LATEST_GAME_SESSION_RECORD_REQUEST,
    LATEST_GAME_SESSION_RECORD_SUCCESS,
    GAME_PREDICTION_HISTORY_DATA_REQUEST,
    GAME_PREDICTION_HISTORY_DATA_SUCCESS,
    LOCALLY_STORE_PREDICTION_HISTORY_SESSION_DATA,
    LOCALLY_STORE_PREDICTION_HISTORY_PREDICTION_DATA,
    LOCALLY_STORE_PREDICTION_HISTORY_PREDICTION_RESULT,
    LOCALLY_STORE_PREDICTION_HISTORY_PREDICTION_USER_LIST,
    ALL_USER_LIST_OBJECT,
    USERS_ORDER_STATUS_DATA_SUCCESS,
    USERS_ORDER_STATUS_DATA_REQUEST, LOCALLY_STORE_USERS_ORDER_STATUS_DETAIL, TOTAL_USER_ORDER_BET_COUNT
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
export const allUsersSubscriptionsDataReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_USERS_SUBSCRIPTION_DATA_REQUEST:
            return { loading: true };
        case ALL_USERS_SUBSCRIPTION_DATA_SUCCESS:
            return { loading: false, subscriptionsData: action.payload };
        default:
            return state;
    }
};

export const adminDashboardAllCountDataReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_DASHBOARD_ALL_COUNT_DATA_REQUEST:
            return { loading: true ,dashboardCount:{
                    total_transactions_count: 0,
                    total_transaction_amount: 0,
                    game_transactions_count: 0,
                    game_transaction_amount: 0,
                    todays_earning: 0,
                    total_earning: 0,
                    total_active_subscriptions_cost: 0,
                    total_subscriptions_cost: 0,
                    todays_betting: 0,
                    total_betting: 0,
                    online_users: 0,
                    total_users: 0,
                    total_orders_amount_sum: 0,
                    today_orders_amount_sum: 0,
                    playing_users: 0,
                    current_orders_count: 0,
                    total_orders_count: 0,
                    total_betting_balance: 0,
                    total_subscriptions: 0,
                    total_active_subscriptions: 0
                }};
        case ADMIN_DASHBOARD_ALL_COUNT_DATA_SUCCESS:
            return { loading: false, dashboardCount: action.payload };
        default:
            return state;
    }
};

export const locallyStorePredictionHistoryDataReducer = (state={}, action) => {
    switch(action.type){
        case LOCALLY_STORE_PREDICTION_HISTORY_SESSION_DATA:
            return {...state, sessionData:action.payload}
        case LOCALLY_STORE_PREDICTION_HISTORY_PREDICTION_DATA:
            return {...state, predictionListData:action.payload};
        case LOCALLY_STORE_PREDICTION_HISTORY_PREDICTION_RESULT:
            return{...state, predictionResultData:action.payload};
        case LOCALLY_STORE_PREDICTION_HISTORY_PREDICTION_USER_LIST:
            return {...state, predictionHistoryUserList:action.payload}
        case LOCALLY_STORE_USERS_ORDER_STATUS_DETAIL:
            return {...state, usersOrderStatusDetail: action.payload}
        default:
            return state
    }
}

export const allUserListObjectReducer = (state={}, action) => {
    switch(action.type){
        case ALL_USER_LIST_OBJECT:
            return action.payload
        default:
            return state
    }
}

export const usersOrderAndStatusDataListReducer = (state={}, action) =>{
    switch (action.type) {
        case USERS_ORDER_STATUS_DATA_REQUEST:
            return {loading:true, usersOrderAndStatusList:[]};
        case USERS_ORDER_STATUS_DATA_SUCCESS:
            return {loading:false, usersOrderAndStatusList: action.payload};
        default:
            return state;
    }
}
export const adminOrderValuesCountDetailReducer = (state={}, action) =>{
    switch(action.type){
        case ADMIN_ORDER_AND_VALUE_COUNT_DATA_REQUEST:
            return {loading:true, dashboardOrderValueCount:{total_orders : 0,
                    completed_orders: 0,
                    pending_orders : 0,
                    total_values: 0,
                    completed_values: 0,
                    pending_values: 0}}
        case ADMIN_ORDER_AND_VALUE_COUNT_DATA_SUCCESS:
            return {loading:false, dashboardOrderValueCount: action.payload};
        default:
            return state;
    }
}

export const latestGameSessionDataReducer = (state ={}, action) =>{
    switch(action.type){
        case LATEST_GAME_SESSION_RECORD_REQUEST:
            return {loading: true, gameSessionData:{}};
        case LATEST_GAME_SESSION_RECORD_SUCCESS:
            return {loading:false, gameSessionData: action.payload};
        default:
            return state;
    }
}

export const userSubscriptionDataReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SUBSCRIPTION_DATA_REQUEST:
            return { loading: true };
        case USER_SUBSCRIPTION_DATA_SUCCESS:
            return { loading: false, subscriptionData: action.payload };
        default:
            return state;
    }
};

export const appSubscriptionPlanDataReducer = (state = {}, action) => {
    switch (action.type) {
        case APP_SUBSCRIPTION_PLAN_REQUEST:
            return { loading: true ,subscriptionPlan:[]};
        case APP_SUBSCRIPTION_PLAN_SUCCESS:
            return { loading: false, subscriptionPlan: action.payload };
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

export const gameSessionAndAllSessionReducer = (state = {}, action) => {
    switch (action.type) {
        case GAME_SESSION_AND_ALL_SESSION_REQUEST:
            return { loading: true,gameSessionData:[]};
        case GAME_SESSION_AND_ALL_SESSION_SUCCESS:
            return { loading: false, gameSessionData: action.payload};
        default:
            return state;
    }
};
export const gamePlatformDataReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_GAME_PLATFORMS_REQUEST:
            return { loading: true,platformData:[]};
        case GET_ALL_GAME_PLATFORMS_SUCCESS:
            return { loading: false, platformData: action.payload};
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

export const gamePredictionHistoryListDataReducer = (state={}, action) =>{
    switch(action.type){
        case GAME_PREDICTION_HISTORY_DATA_REQUEST:
            return {loading:true, gamePredictionHistoryList:[]};
        case GAME_PREDICTION_HISTORY_DATA_SUCCESS:
            return {loading:false, gamePredictionHistoryList: action.payload};
        default:
            return state
    }
}

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

export const totalUsersOrderCurrentBetCountReducer = (state = {}, action) => {
    switch (action.type) {
        case TOTAL_USER_ORDER_BET_COUNT:
            return action.payload;
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
            return {prediction:{},timer:60 - new Date().getSeconds(),dateTime:new Date()};
        case USER_BET_PREDICTION_STATUS:
            return {prediction:action.payload,timer:60 - new Date().getSeconds(),dateTime:new Date()};
        case USER_BET_PREDICTION_STATUS_TIMER:
            return {prediction:state.prediction,dateTime:state.dateTime,timer:action.payload};
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