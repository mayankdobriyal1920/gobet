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
import createSocketConnection from "../socket/socket";
const api = Axios.create({
    baseURL: 'https://121tuition.in/api-get-bet/common/',
    withCredentials:true
})

// const api = Axios.create({
//     baseURL: process.env.REACT_APP_NODE_ENV === 'PRODUCTION' ? `https://gobet.onrender.com/api-call/common/` : 'http://localhost:4000/api-call/common/',
//     withCredentials:true
// })

export const actionToGetUserSessionData = () => async (dispatch) => {
    dispatch({type: USER_SESSION_REQUEST});
    try {
        api.post(`actionToGetCurrentUserSessionDataApiCall`, {},{ withCredentials: true }).then(responseData => {
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
        api.post(`actionToTransferAmountFromUserMainWalletToGameWalletApiCall`, {amount}).then(() => {
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

export const actionToGenerateDepositRequest = (amount,setLoadingDepositAmountSuccess,setShowSuccessAlertToDepositRequest) => async () => {
    try {
        api.post(`actionToGenerateDepositRequestApiCall`, {amount}).then(() => {
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

export const actionToGetAllUsersNormalAndSubAdminList = (payload = {}) => async (dispatch) => {
    dispatch({type: ALL_USERS_NORMAL_AND_SUB_ADMIN_LIST_REQUEST});
    try {
        api.post(`actionToGetAllUsersNormalAndSubAdminListApiCall`, {payload}).then(responseData => {
            dispatch({ type: ALL_USERS_NORMAL_AND_SUB_ADMIN_LIST_SUCCESS, payload: [...responseData.data]});
        })
    } catch (error) {
        console.log(error);
    }
}

let betStateTimeInterval = null;

export const actionToStartTimeIntervalOfUserTime = (createdAt) => async (dispatch) => {
    let dataOfCreation = new Date(createdAt);
    const startTime = dataOfCreation.getTime(); // ✅ Correct way to get the timestamp

    betStateTimeInterval = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000); // ✅ Correct elapsed time calculation

        if (elapsedSeconds >= 60) {
            clearInterval(betStateTimeInterval);
            dispatch({ type: USER_BET_PREDICTION_STATUS_WAITING });
        } else {
            dispatch({
                type: USER_BET_PREDICTION_STATUS_TIMER,
                payload: 60 - elapsedSeconds, // ✅ Countdown from 60 seconds
            });
        }
    }, 1000);
}


export const actionToMakeCurrentUserInactive = (betting_active_users_id) => async () => {
    api.post(`actionToMakeCurrentUserInactiveApiCall`, {betting_active_users_id});
}
export const actionToConnectSocketServer = () => async (dispatch,getState) => {
    const socket = createSocketConnection();
    socket.on('connect', () => {
        console.log('Connected to socket server:', socket.id);
    });

    socket.on('message', (data) => {
        let websocketData = JSON.parse(data);
        switch (websocketData?.type) {
            case 'USER_DATA_FOR_READY_STATE':
            case 'USER_BETTING_DATA_RECEIVED':
            case 'USER_BETTING_TIME_END':
                if (websocketData?.selectedGroup?.length) {
                    const userIdsArray = websocketData.selectedGroup.map(user => user.id);

                    if (userIdsArray.includes(getState().userAuthDetail?.userInfo?.id)) {
                        let currentUserBetData = websocketData.selectedGroup.find((user) =>
                            user?.id === getState().userAuthDetail?.userInfo?.id
                        );

                        if (currentUserBetData?.betting_active_users_id) {
                            dispatch(actionToGetUserBetPredictionData(currentUserBetData?.betting_active_users_id));
                        }
                    }
                }
                break;
        }
        if(websocketData?.type === "USER_BETTING_TIME_END") {
            setTimeout(()=>{
                dispatch(actionToGetUserWalletAndGameBalance())
            })
        }
    });


    socket.on('disconnect', () => {
        console.log('Disconnected from socket server');
    });
}
export const actionToGetUserBetPredictionData = (betting_active_users_id,loading = false) => async (dispatch) => {

    function clearAllTimeOut(){
        if(betStateTimeInterval) {
            clearInterval(betStateTimeInterval);
            betStateTimeInterval = null;
        }
    }

    if(loading){
        clearAllTimeOut();
        dispatch({type: USER_BET_PREDICTION_STATUS_LOADING_REQUEST});
    }

    if(betting_active_users_id) {
        try {
            api.post(`actionToGetUserBetPredictionDataApiCall`, {betting_active_users_id}).then(responseData => {
                if (responseData?.data?.success === 5) {
                    clearAllTimeOut();
                    dispatch({type: USER_BET_PREDICTION_STATUS_EXPIRED});
                } else if (responseData?.data?.success === 1) {
                    if(responseData?.data.prediction?.status === 3){
                        clearAllTimeOut();
                        dispatch({type: USER_BET_PREDICTION_STATUS_WAITING});
                    }else if(responseData?.data.prediction?.status === 2){
                        clearAllTimeOut();
                        dispatch({type: USER_BET_PREDICTION_STATUS_READY});
                    }else if(responseData?.data.prediction?.status === 1) {
                        if(!betStateTimeInterval) {
                            dispatch({type: USER_BET_PREDICTION_STATUS, payload: {...responseData?.data.prediction}});
                            dispatch(actionToStartTimeIntervalOfUserTime(responseData?.data?.prediction?.created_at));
                        }
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

export const actionToUpdateUserAliveForGame = (callFunctionToEnterInGame) => async () => {
    try {
        api.post(`actionToUpdateUserAliveForGameApiCall`, {}).then((responseData) => {
            if(callFunctionToEnterInGame) {
                callFunctionToEnterInGame(responseData?.data?.betting_active_users_id);
            }
        })
    } catch (error) {
        console.log(error);
    }
}