import Axios from 'axios';
import {
    USER_GET_OTP_REQUEST_SUCCESS,
    USER_GET_OTP_REQUEST_FAIL,
    USER_SESSION_REQUEST,
    USER_SESSION_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNUP_SIGNIN_ERROR,
    CHANGE_USER_AVATAR_MODAL,
    USER_WALLET_AND_GAME_BALANCE_REQUEST,
    USER_WALLET_AND_GAME_BALANCE_SUCCESS,
    USER_BET_PREDICTION_STATUS,
    USER_BET_PREDICTION_STATUS_WAITING,
    USER_BET_PREDICTION_STATUS_TIMER,
    USER_BET_PREDICTION_HISTORY_REQUEST,
    USER_BET_PREDICTION_HISTORY_SUCCESS,
    USER_BET_PREDICTION_STATUS_LOADING_REQUEST,
    USER_BET_PREDICTION_STATUS_EXPIRED,
    USER_BET_PREDICTION_STATUS_READY,
    USER_BET_PREDICTION_STATUS_READY_TIMER,
    USER_WITHDRAWAL_AMOUNT_HISTORY_REQUEST,
    USER_WITHDRAWAL_AMOUNT_HISTORY_SUCCESS,
    USER_DEPOSIT_AMOUNT_HISTORY_REQUEST,
    USER_DEPOSIT_AMOUNT_HISTORY_SUCCESS,
    ADMIN_GAME_RESULT_LIST_REQUEST,
    ADMIN_GAME_RESULT_LIST_SUCCESS,
    PENDING_WITHDRAWAL_REQUEST_LIST_REQUEST,
    PENDING_WITHDRAWAL_REQUEST_LIST_SUCCESS,
    ALL_USERS_UNDER_SUB_ADMIN_LIST_REQUEST,
    ALL_USERS_UNDER_SUB_ADMIN_LIST_SUCCESS,
    USER_GAME_HISTORY_REQUEST,
    USER_GAME_HISTORY_SUCCESS,
    PENDING_DEPOSIT_REQUEST_LIST_REQUEST,
    PENDING_DEPOSIT_REQUEST_LIST_SUCCESS,
    GENERATED_PASSCODE_LIST_BY_ADMIN_REQUEST,
    GENERATED_PASSCODE_LIST_BY_ADMIN_SUCCESS,
    USER_GET_OTP_REQUEST,
    PASSCODE_REQUEST_BY_SUB_ADMIN_REQUEST,
    PASSCODE_REQUEST_BY_SUB_ADMIN_SUCCESS,
    ALL_USERS_NORMAL_AND_SUB_ADMIN_LIST_REQUEST,
    ALL_USERS_NORMAL_AND_SUB_ADMIN_LIST_SUCCESS, USER_MONEY_TRANSACTIONS_REQUEST, USER_MONEY_TRANSACTIONS_SUCCESS
} from "./CommonConstants";
const api = Axios.create({
    baseURL: process.env.REACT_APP_NODE_ENV === 'PRODUCTION' ? `https://gobet.onrender.com/api-call/common/` : 'http://localhost:4000/api-call/common/',
    withCredentials:true
})

export const actionToGetUserSessionData = () => async (dispatch) => {
    dispatch({type: USER_SESSION_REQUEST});
    try {
        api.post(`actionToGetCurrentUserSessionDataApiCall`, {}).then(responseData => {
            if(responseData?.data?.success){
                dispatch({ type: USER_SESSION_SUCCESS, payload: 1});
                dispatch({ type: USER_SIGNIN_SUCCESS, payload: {...responseData?.data.userData}});
            }else{
                dispatch({type: USER_SESSION_SUCCESS, payload:0,});
            }
        })
    } catch (error) {
        dispatch({type: USER_SESSION_SUCCESS, payload:0,});
    }
}

export const actionToLoginUserAndSendOtp = (phone) => async (dispatch) => {
    // try {
    //     api.post(`actionToLoginUserAndSendOtpApiCall`, {phone}).then(data => {
    //         if(data?.response?.status){
    //
    //         }else{
    //
    //         }
    //     })
    // } catch (error) {
    //
    // }
}

export const actionToSendOtp = (phone,callFunctionToSendOtpTimeInterval) => async (dispatch) => {
    dispatch({ type: USER_GET_OTP_REQUEST});
    try {
        api.post(`actionToSendOtpApiCall`, {phone}).then(responseData => {
            if(responseData?.data?.success){
                if(callFunctionToSendOtpTimeInterval)
                    callFunctionToSendOtpTimeInterval();
                dispatch({ type: USER_GET_OTP_REQUEST_SUCCESS});
            }else{
                dispatch({ type: USER_GET_OTP_REQUEST_FAIL});
                dispatch({ type: USER_SIGNUP_SIGNIN_ERROR, payload: {error: responseData?.data?.error, message: responseData?.data?.message}});
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToSendOtpForLogin = (phone,callFunctionToSendOtpTimeInterval) => async (dispatch) => {
    dispatch({ type: USER_GET_OTP_REQUEST});
    try {
        api.post(`actionToSendOtpForLoginApiCall`, {phone}).then(responseData => {
            dispatch({ type: USER_GET_OTP_REQUEST_SUCCESS});
            if(responseData?.data?.success){
                if(callFunctionToSendOtpTimeInterval)
                    callFunctionToSendOtpTimeInterval();
            }else{
                dispatch({ type: USER_SIGNUP_SIGNIN_ERROR, payload: {error: responseData?.data?.error, message: responseData?.data?.message}});
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToSignupUser = (phone,otp,passcode) => async (dispatch) => {
    //dispatch({type: USER_SIGNIN_REQUEST});
    try {
        api.post(`actionToSignupUserApiCall`, {phone,otp,passcode}).then(responseData => {
            if(responseData?.data?.success){
                dispatch({ type: USER_SIGNIN_SUCCESS, payload: {...responseData?.data.userData}});
            }else{
                dispatch({ type: USER_SIGNUP_SIGNIN_ERROR, payload: {error: responseData?.data?.error, message: responseData?.data?.message}});
                dispatch({type: USER_SIGNIN_FAIL, payload:'Auth Fail!',});
            }
        })
    } catch (error) {
        console.log(error)
    }
}


export const actionToLogoutUserSession = (setUserLogoutLoading) => async (dispatch) => {
    try {
        api.post(`actionToLogoutUserSessionApiCall`, {}).then(() => {
            if(setUserLogoutLoading){
                setUserLogoutLoading(false);
            }
            dispatch({ type: USER_SIGNIN_SUCCESS, payload: {}});
        })
    } catch (error) {
        console.log('error',error)
    }
}

export const actionToVerifyLoginUserOtp = (phone,otp) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST});
    try {
        api.post(`actionToVerifyLoginUserOtpApiCall`, {phone,otp}).then(responseData => {
            if(responseData?.data?.success){
                dispatch({ type: USER_SIGNIN_SUCCESS, payload: {...responseData?.data.userData}});
            }else{
                dispatch({type: USER_SIGNIN_FAIL, payload:'Auth Fail!',});
                dispatch({ type: USER_SIGNUP_SIGNIN_ERROR, payload: {error: responseData?.data?.error, message: responseData?.data?.message}});
            }
        })
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const actionOpenCloseChangeAvatarModal = (action) => async (dispatch) => {
    dispatch({type: CHANGE_USER_AVATAR_MODAL, payload: {open: action}});
}

export const actionUpdateUserAvatar = (userId, avatar) => async (dispatch) => {
    //dispatch({type: CHANGE_USER_AVATAR_MODAL, payload: {open: false}});
    try {
        api.post(`actionUpdateAvatarApiCall`, {userId,avatar}).then(responseData => {
            if(responseData?.data?.success){
                dispatch({ type: USER_SIGNIN_SUCCESS, payload: {...responseData?.data.userData}});
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionUpdateUserName = (name) => async (dispatch) => {
    try {
        api.post(`actionUpdateNameApiCall`, {name}).then(responseData => {
            if(responseData?.data?.success){
                dispatch({ type: USER_SIGNIN_SUCCESS, payload: {...responseData?.data.userData}});
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGetUserWalletAndGameBalance = (setBalanceLoading) => async (dispatch) => {
    //dispatch({type: USER_WALLET_AND_GAME_BALANCE_REQUEST});
    try {
        api.post(`actionToGetUserWalletAndGameBalanceApiCall`, {}).then(responseData => {
            dispatch({ type: USER_WALLET_AND_GAME_BALANCE_SUCCESS, payload: {...responseData.data}});
            if(setBalanceLoading){
                setBalanceLoading(false);
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionAddMoneyToGameWallet = (amount,setLoadingAddAmountSuccess) => async (dispatch) => {
    try {
        api.post(`actionToTransferAmountFromUserMainWalletToGameWalletApiCall`, {amount}).then(responseData => {
            dispatch(actionToGetUserWalletAndGameBalance());
            setTimeout(()=>{
                setLoadingAddAmountSuccess(false);
            },1000)
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGenerateWithdrawalRequestAndDeductAmount = (amount,setLoadingWithdrawalAmountSuccess,setShowSuccessAlertToWithdrawalRequest) => async (dispatch) => {
    try {
        api.post(`actionToGenerateWithdrawalRequestAndDeductAmountApiCall`, {amount}).then(responseData => {
            dispatch(actionToGetUserWalletAndGameBalance());
            setTimeout(()=>{
                setLoadingWithdrawalAmountSuccess(false);
                setShowSuccessAlertToWithdrawalRequest(true);
            },1000)
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGenerateDepositRequest = (amount,setLoadingDepositAmountSuccess,setShowSuccessAlertToDepositRequest) => async (dispatch) => {
    try {
        api.post(`actionToGenerateDepositRequestApiCall`, {amount}).then(responseData => {
            setTimeout(()=>{
                setLoadingDepositAmountSuccess(false);
                setShowSuccessAlertToDepositRequest(true);
            },1000)
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionTransferMoneyToMainWallet = (setWalletTransferLoader) => async (dispatch) => {
    try {
        api.post(`actionTransferMoneyToMainWalletApiCall`, {}).then(responseData => {
            dispatch(actionToGetUserWalletAndGameBalance());
            setTimeout(()=>{
                setWalletTransferLoader(false);
            },1000)
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGetUserBetPredictionHistory = () => async (dispatch) => {
    dispatch({type: USER_BET_PREDICTION_HISTORY_REQUEST});
    try {
        api.post(`actionToGetUserBetPredictionHistoryApiCall`, {}).then(responseData => {
            dispatch({ type: USER_BET_PREDICTION_HISTORY_SUCCESS, payload: [...responseData.data]});
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGetPasscodeRequestBySubAdmin = () => async (dispatch) => {
    dispatch({type: PASSCODE_REQUEST_BY_SUB_ADMIN_REQUEST});
    try {
        api.post(`actionToGetPasscodeRequestBySubAdminApiCall`, {}).then(responseData => {
            dispatch({ type: PASSCODE_REQUEST_BY_SUB_ADMIN_SUCCESS, payload: {...responseData.data}});
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGeneratePasscodeRequestBySubAdmin = (count,callFunctionToResetPasscodeRequest) => async () => {
    try {
        api.post(`actionToGeneratePasscodeRequestBySubAdminApiCall`, {count}).then(responseData => {
            callFunctionToResetPasscodeRequest();
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToApprovePasscodeRequestAndGeneratePasscode = (payload = {},callFunctionToResetPasscodeRequest) => async () => {
    try {
        api.post(`actionToApprovePasscodeRequestAndGeneratePasscodeApiCall`, payload).then(() => {
            callFunctionToResetPasscodeRequest();
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToUpdateUserRole = (role,userId,callFunctionToResetPasscodeRequest) => async () => {
    try {
        api.post(`actionToUpdateUserRoleApiCall`, {role,userId}).then(() => {
            callFunctionToResetPasscodeRequest();
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGetWithdrawalRequestHistoryData = (isLoading = true,payload = {}) => async (dispatch) => {
    if(isLoading) {
        dispatch({type: USER_WITHDRAWAL_AMOUNT_HISTORY_REQUEST});
    }
    try {
        api.post(`actionToGetWithdrawalRequestHistoryDataApiCall`, {payload}).then(responseData => {
            dispatch({ type: USER_WITHDRAWAL_AMOUNT_HISTORY_SUCCESS, payload: [...responseData.data]});
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGetDepositRequestHistoryData = (isLoading = true,payload = {}) => async (dispatch) => {
    if(isLoading) {
        dispatch({type: USER_DEPOSIT_AMOUNT_HISTORY_REQUEST});
    }
    try {
        api.post(`actionToGetDepositRequestHistoryDataApiCall`, {payload}).then(responseData => {
            dispatch({ type: USER_DEPOSIT_AMOUNT_HISTORY_SUCCESS, payload: [...responseData.data]});
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGetGameHistoryData = (isLoading = true,payload = {}) => async (dispatch) => {
    if(isLoading) {
        dispatch({type: USER_GAME_HISTORY_REQUEST});
    }
    try {
        api.post(`actionToGetGameHistoryDataApiCall`, {payload}).then(responseData => {
            dispatch({ type: USER_GAME_HISTORY_SUCCESS, payload: [...responseData.data]});
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGetMoneyTransactionData = (isLoading = true,payload = {}) => async (dispatch) => {
    if(isLoading) {
        dispatch({type: USER_MONEY_TRANSACTIONS_REQUEST});
    }
    try {
        api.post(`actionToGetMoneyTransactionDataApiCall`, {payload}).then(responseData => {
            dispatch({ type: USER_MONEY_TRANSACTIONS_SUCCESS, payload: [...responseData.data]});
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGetAdminGameResultListData = (isLoading = true,payload = {}) => async (dispatch) => {
    if(isLoading) {
        dispatch({type: ADMIN_GAME_RESULT_LIST_REQUEST});
    }
    try {
        api.post(`actionToGetAdminGameResultListDataApiCall`, {payload}).then(responseData => {
            dispatch({ type: ADMIN_GAME_RESULT_LIST_SUCCESS, payload: [...responseData.data]});
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGetPendingWithdrawalRequestListData = (isLoading = true,payload = {}) => async (dispatch) => {
    if(isLoading) {
        dispatch({type: PENDING_WITHDRAWAL_REQUEST_LIST_REQUEST});
    }
    try {
        api.post(`actionToGetPendingWithdrawalRequestListDataApiCall`, {payload}).then(responseData => {
            dispatch({ type: PENDING_WITHDRAWAL_REQUEST_LIST_SUCCESS, payload: [...responseData.data]});
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGetPendingDepositRequestListData = (isLoading = true,payload = {}) => async (dispatch) => {
    if(isLoading) {
        dispatch({type: PENDING_DEPOSIT_REQUEST_LIST_REQUEST});
    }
    try {
        api.post(`actionToGetPendingDepositRequestListDataApiCall`, {payload}).then(responseData => {
            dispatch({ type: PENDING_DEPOSIT_REQUEST_LIST_SUCCESS, payload: [...responseData.data]});
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGetAdminUserPasscodeListDataList = (isLoading = true,payload = {}) => async (dispatch) => {
    if(isLoading) {
        dispatch({type: GENERATED_PASSCODE_LIST_BY_ADMIN_REQUEST});
    }
    try {
        api.post(`actionToGetAdminUserPasscodeListDataListApiCall`, {payload}).then(responseData => {
            dispatch({ type: GENERATED_PASSCODE_LIST_BY_ADMIN_SUCCESS, payload: [...responseData.data]});
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToCallFunctionToUpdateGameResult = (id,result,callFunctionToReloadGameResultLis) => async (dispatch) => {
    try {
        api.post(`actionToCallFunctionToUpdateGameResultApiCall`, {id,result}).then(responseData => {
            if(callFunctionToReloadGameResultLis)
               callFunctionToReloadGameResultLis();
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToCompleteStatusOfWithdrawalRequest = (id,callFunctionToReloadList) => async () => {
    try {
        api.post(`actionToCompleteStatusOfWithdrawalRequestApiCall`, {id}).then(() => {
            if(callFunctionToReloadList)
                callFunctionToReloadList();
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToCompleteStatusOfDepositRequest = (id,callFunctionToReloadList) => async () => {
    try {
        api.post(`actionToCompleteStatusOfDepositRequestApiCall`, {id}).then(() => {
            if(callFunctionToReloadList)
                callFunctionToReloadList();
        })
    } catch (error) {
        console.log(error);
    }
}
export const actionToGetAllUsersUnderSubAdminList = () => async (dispatch) => {
    dispatch({type: ALL_USERS_UNDER_SUB_ADMIN_LIST_REQUEST});
    try {
        api.post(`actionToGetAllUsersUnderSubAdminListApiCall`, {}).then(responseData => {
            dispatch({ type: ALL_USERS_UNDER_SUB_ADMIN_LIST_SUCCESS, payload: [...responseData.data]});
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGetAllUsersNormalAndSubAdminList = () => async (dispatch) => {
    dispatch({type: ALL_USERS_NORMAL_AND_SUB_ADMIN_LIST_REQUEST});
    try {
        api.post(`actionToGetAllUsersNormalAndSubAdminListApiCall`, {}).then(responseData => {
            dispatch({ type: ALL_USERS_NORMAL_AND_SUB_ADMIN_LIST_SUCCESS, payload: [...responseData.data]});
        })
    } catch (error) {
        console.log(error);
    }
}

let betStateTimeInterval = null;

export const actionToStartTimeIntervalOfUserTime = (betting_active_users_id) => async (dispatch) => {
    // Capture the starting time
    const startTime = new Date();

    // Start an interval to calculate the seconds difference
    betStateTimeInterval = setInterval(() => {
        const currentTime = new Date();
        // Calculate the elapsed time in seconds
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);

        // Check if the interval has reached 60 seconds
        if (elapsedSeconds >= 60) {
            clearInterval(betStateTimeInterval); // Stop the interval
            dispatch({ type: USER_BET_PREDICTION_STATUS_WAITING });
            /////// call set timer for waiting state ///////
            dispatch(actionToRecallTimeoutForGetBetUser(betting_active_users_id, 0));
            /////// call set timer for waiting state ///////
        } else {
            // Dispatch the remaining seconds as a countdown from 60
            dispatch({
                type: USER_BET_PREDICTION_STATUS_TIMER,
                payload: 60 - elapsedSeconds, // Countdown from 60 seconds
            });
        }
    }, 1000); // Execute the interval every 1 second
}

let readyStateTimeInterval = null

export const actionToStartTimeIntervalReadyStateTimer = () => async (dispatch, getState) => {
    // Retrieve the previous date-time from the Redux state
    let prevDateTime = getState().userBetPredictionStatus.readyStateDateTime;

    // Start an interval to calculate the seconds difference
    readyStateTimeInterval = setInterval(() => {
        // Get the current time
        let currentDateTime = new Date();

        // Calculate the difference in seconds between the current and previous time
        let secondCount = Math.floor((currentDateTime - new Date(prevDateTime)) / 1000);

        // Check if the interval has reached 120 seconds (2 minutes)
        if (secondCount >= 120) {
            clearInterval(readyStateTimeInterval); // Stop the interval
        } else {
            // Dispatch the remaining seconds as a countdown
            dispatch({
                type: USER_BET_PREDICTION_STATUS_READY_TIMER,
                payload: 120 - secondCount, // Countdown to 120 seconds
            });
        }
    }, 1000); // Execute the interval every 1 second
}


let getPredictionTimeOut = null;

export const actionToRecallTimeoutForGetBetUser = (betting_active_users_id,wait = 1000) => async (dispatch) => {
    /////////// CHECK REGULAR FOR BET PROGRESS ////////
    getPredictionTimeOut = setTimeout(() => {
        dispatch(actionToGetUserBetPredictionData(betting_active_users_id));
    },wait)
    /////////// CHECK REGULAR FOR BET PROGRESS ////////
}
export const actionToGetUserBetPredictionData = (betting_active_users_id,loading = false) => async (dispatch) => {
console.log('actionToGetUserBetPredictionData',betting_active_users_id)

    function clearAllTimeOut(){
        if(getPredictionTimeOut) {
            clearTimeout(getPredictionTimeOut);
            getPredictionTimeOut = null
        }
        if(readyStateTimeInterval) {
            clearInterval(readyStateTimeInterval);
            readyStateTimeInterval = null;
        }
        if(betStateTimeInterval) {
            clearInterval(betStateTimeInterval);
            betStateTimeInterval = null;
        }
    }

    if(loading){
        clearAllTimeOut();
        dispatch({type: USER_BET_PREDICTION_STATUS_LOADING_REQUEST});
    }

    if(betting_active_users_id && !isNaN(betting_active_users_id)) {
        try {
            api.post(`actionToGetUserBetPredictionDataApiCall`, {betting_active_users_id}).then(responseData => {
                if (responseData?.data?.success === 5) {
                    clearAllTimeOut();
                    dispatch({type: USER_BET_PREDICTION_STATUS_EXPIRED});
                } else if (responseData?.data?.success === 1) {
                    if(responseData?.data.prediction?.status === 3){
                        clearAllTimeOut();
                        dispatch({type: USER_BET_PREDICTION_STATUS_WAITING});
                        /////// call set timer for waiting state ///////////
                        dispatch(actionToRecallTimeoutForGetBetUser(betting_active_users_id));
                        /////// call set timer for waiting state ///////////
                    }else if(responseData?.data.prediction?.status === 2){
                        if(betStateTimeInterval) {
                            clearInterval(betStateTimeInterval);
                            betStateTimeInterval = null;
                        }
                        if(!readyStateTimeInterval) {
                            dispatch({type: USER_BET_PREDICTION_STATUS_READY});
                            dispatch(actionToStartTimeIntervalReadyStateTimer(betting_active_users_id));
                        }
                        /////// call set timer for waiting state ///////////
                        dispatch(actionToRecallTimeoutForGetBetUser(betting_active_users_id));
                        /////// call set timer for waiting state ///////////
                    }else if(responseData?.data.prediction?.status === 1) {
                        if(readyStateTimeInterval) {
                            clearInterval(readyStateTimeInterval);
                            readyStateTimeInterval = null;
                        }
                        if(!betStateTimeInterval) {
                            dispatch({type: USER_BET_PREDICTION_STATUS, payload: {...responseData?.data.prediction}});
                            dispatch(actionToStartTimeIntervalOfUserTime(betting_active_users_id));
                        }
                        ///////// REMOVE TIME OUT TIMER ON FOUND STATE ///////////
                        if(getPredictionTimeOut){
                            clearTimeout(getPredictionTimeOut);
                            getPredictionTimeOut = null;
                        }
                        ///////// REMOVE TIME OUT TIMER ON FOUND STATE ///////////
                    }else if(responseData?.data.prediction?.status === 0 || responseData?.data.prediction?.status === 4) {
                        clearAllTimeOut();
                        dispatch({type: USER_BET_PREDICTION_STATUS_EXPIRED});
                    }

                }
            })
        } catch (error) {
            console.log(error);
        }
    }else{
        clearAllTimeOut();
        dispatch({type: USER_BET_PREDICTION_STATUS_EXPIRED});
    }
}

export const actionToUpdateUserAliveForGame = (callFunctionToEnterInGame) => async (dispatch) => {
    try {
        api.post(`actionToUpdateUserAliveForGameApiCall`, {}).then((responseData) => {
            if(callFunctionToEnterInGame) {
                dispatch(actionToGetUserWalletAndGameBalance());
                callFunctionToEnterInGame(responseData?.data?.betting_active_users_id);
            }
        })
    } catch (error) {
        console.log(error);
    }
}