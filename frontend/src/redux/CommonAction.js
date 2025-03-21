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
    ALL_USERS_NORMAL_AND_SUB_ADMIN_LIST_SUCCESS,
    USER_MONEY_TRANSACTIONS_REQUEST,
    USER_MONEY_TRANSACTIONS_SUCCESS,
    NEAREST_GAME_SESSION_AND_ACTIVE_SESSION_REQUEST,
    NEAREST_GAME_SESSION_AND_ACTIVE_SESSION_SUCCESS,
    BET_ACTIVE_USER_REQUEST,
    BET_ACTIVE_USER_SUCCESS,
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
    GET_ALL_GAME_PLATFORMS_SUCCESS
} from "./CommonConstants";
import createSocketConnection from "../socket/socket";
import moment from "moment-timezone";
const api = Axios.create({
    baseURL: 'https://unikpayindia.com/api-get-bet/common/',
    withCredentials:true
})

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

export const actionToSignupUser = (phone,fullName,otp,passcode) => async (dispatch) => {
    //dispatch({type: USER_SIGNIN_REQUEST});
    try {
        const firstName = fullName.split(" ")[0]; // Extract first name
        const lastFiveDigits = phone.slice(-5); // Extract last 5 digits of phone number
        api.post(`actionToSignupUserApiCall`, {phone,otp,name:fullName,passcode,uid:`${firstName}${lastFiveDigits}`}).then(responseData => {
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

export const actionToGetBetActiveUserData = () => async (dispatch) => {
    dispatch({ type: BET_ACTIVE_USER_REQUEST});
    try {
        api.post(`actionToGetBetActiveUserDataApiCall`, {}).then(responseData => {
            dispatch({ type: BET_ACTIVE_USER_SUCCESS, payload: {...responseData.data}});
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGetBetGameSessionData = (sessionId,isLoading = true) => async (dispatch) => {
    if(isLoading)
      dispatch({ type: BET_GAME_SESSION_REQUEST});
    try {
        api.post(`actionToGetBetGameSessionDataApiCall`, {session_id:sessionId}).then(responseData => {
            dispatch({ type: BET_GAME_SESSION_SUCCESS, payload: {...responseData.data}});
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGetGameLastResultData = (sessionId) => async (dispatch) => {
    dispatch({ type: GET_GAME_LAST_RESULT_REQUEST});
    try {
        api.post(`actionToGetGameLastResultDataApiCall`, {session_id:sessionId}).then(responseData => {
            dispatch({ type: GET_GAME_LAST_RESULT_SUCCESS, payload: {...responseData.data}});
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGetUserActiveSubscriptionData= (setActivationPlanLoader) => async (dispatch) => {
    dispatch({ type: USER_SUBSCRIPTION_DATA_REQUEST});
    try {
        api.post(`actionToGetUserActiveSubscriptionDataApiCall`, {}).then(responseData => {
            dispatch({ type: USER_SUBSCRIPTION_DATA_SUCCESS, payload: {...responseData.data}});
            if(setActivationPlanLoader)
                setActivationPlanLoader(false);
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGetAppSubscriptionPlanData = () => async (dispatch) => {
    dispatch({ type: APP_SUBSCRIPTION_PLAN_REQUEST});
    try {
        api.post(`actionToGetAppSubscriptionPlanDataApiCall`, {}).then(responseData => {
            dispatch({ type: APP_SUBSCRIPTION_PLAN_SUCCESS, payload: [...responseData.data]});
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToActivateSubscriptionPlan = (plan,setActivationPlanLoader) => async (dispatch) => {
    try {
        api.post(`actionToActivateSubscriptionPlanApiCall`, {plan}).then(() => {
            dispatch(actionToGetUserActiveSubscriptionData(setActivationPlanLoader));
            dispatch(actionToGetUserWalletAndGameBalance());
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

export const actionToGetUserBetPredictionHistory = (isLoading = true) => async (dispatch) => {
    if(isLoading)
       dispatch({type: USER_BET_PREDICTION_HISTORY_REQUEST});
    try {
        api.post(`actionToGetUserBetPredictionHistoryApiCall`, {}).then(responseData => {
            dispatch({ type: USER_BET_PREDICTION_HISTORY_SUCCESS, payload: [...responseData.data]});
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGetNearestGameSessionOrActiveSessionAndGamePlatform = (gameType) => async (dispatch) => {
    dispatch({type: NEAREST_GAME_SESSION_AND_ACTIVE_SESSION_REQUEST});
    try {
        api.post(`actionToGetNearestGameSessionOrActiveSessionAndGamePlatformApiCall`, {game_type:gameType}).then(responseData => {
            let allData = responseData.data;
            if(allData?.betting_platforms_json){
                allData.platforms = JSON.parse(allData?.betting_platforms_json);
            }
            dispatch({ type: NEAREST_GAME_SESSION_AND_ACTIVE_SESSION_SUCCESS, payload: {...allData}});
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGetGameSessionOrAllSessionAndGamePlatform = (gameType) => async (dispatch) => {
    dispatch({type: GAME_SESSION_AND_ALL_SESSION_REQUEST});
    try {
        api.post(`actionToGetGameSessionOrAllSessionAndGamePlatformApiCall`, {game_type:gameType}).then(responseData => {
            dispatch({ type: GAME_SESSION_AND_ALL_SESSION_SUCCESS, payload: [...responseData.data]});
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToSaveGameSessionData = (sessionDataToEdit,multipleGamePlatforms,gameType,sessionStartTime,resetUpdate) => async (dispatch) => {
    try {
        let payload = {
            id: sessionDataToEdit?.id,
            start_time: moment(sessionStartTime || new Date()).format("HH:mm:ss"), // Default to current time if null
            end_time: moment(sessionStartTime || new Date()).add(1, "hour").format("HH:mm:ss"),
            betting_platforms_json: JSON.stringify(multipleGamePlatforms ?? []), // Ensure it's always an array
            game_type:gameType
        };
        api.post(`actionToSaveGameSessionDataApiCall`, payload).then(() => {
            if(resetUpdate)
                resetUpdate()
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGetGamePlatformData = () => async (dispatch) => {
    dispatch({type: GET_ALL_GAME_PLATFORMS_REQUEST});
    try {
        api.post(`actionToGetGamePlatformDataApiCall`, {}).then(responseData => {
            dispatch({ type: GET_ALL_GAME_PLATFORMS_SUCCESS, payload: [...responseData.data]});
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

export const actionToStartTimeIntervalOfUserTime = () => async (dispatch) => {
    if(betStateTimeInterval !== null){
        clearInterval(betStateTimeInterval);
    }
    betStateTimeInterval = setInterval(() => {
        dispatch({type: USER_BET_PREDICTION_STATUS_TIMER, payload: 60 - new Date().getSeconds()});
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
            case 'USER_BETTING_DATA_RECEIVED':
                if (websocketData?.selectedGroup?.length) {
                    const userIdsArray = websocketData.selectedGroup.map(user => user.id);
                    if (userIdsArray.includes(getState().userAuthDetail?.userInfo?.id)) {
                        let currentUserBetData = websocketData.selectedGroup.find((user) =>
                            user?.id === getState().userAuthDetail?.userInfo?.id
                        );
                        if (currentUserBetData?.betting_active_users_id) {
                            dispatch(actionToGetUserBetPredictionData(currentUserBetData?.betting_active_users_id));
                        }
                        dispatch(actionToGetUserWalletAndGameBalance())
                        dispatch(actionToGetUserActiveSubscriptionData())
                    }
                }
                break;
        }
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from socket server');
    });
}
export const actionToGetUserBetPredictionData = (betting_active_users_id,isLoading = true) => async (dispatch) => {
    //if(isLoading){
       dispatch({type: USER_BET_PREDICTION_STATUS_LOADING_REQUEST});
    dispatch(actionToStartTimeIntervalOfUserTime());
    try {
        api.post(`actionToGetUserBetPredictionDataApiCall`, {betting_active_users_id}).then(responseData => {
            dispatch({type: USER_BET_PREDICTION_STATUS, payload: {...responseData?.data.prediction}});
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToUpdateUserAliveForGame = (sessionId,platformId,callFunctionToEnterInGame) => async () => {
    try {
        api.post(`actionToUpdateUserAliveForGameApiCall`, {sessionId:sessionId,platformId:platformId}).then(() => {
            if(callFunctionToEnterInGame) {
                callFunctionToEnterInGame(sessionId);
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToCallFunctionToActiveSectionAndStartGame = (sessionId,platformId,callFunctionToEnterInGame) => async () => {
    try {
        api.post(`actionToCallFunctionToActiveSectionAndStartGameApiCall`, {sessionId:sessionId,platformId:platformId}).then(() => {
            if(callFunctionToEnterInGame) {
                callFunctionToEnterInGame(sessionId);
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToOrderNextBetActivateUser = (betId) => async (dispatch) => {
    try {
        api.post(`actionToOrderNextBetActivateUserApiCall`, {bet_id:betId}).then(() => {
            dispatch(actionToGetUserBetPredictionData(betId,false));
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToCancelNextBetOrderActivateUser = (betId) => async (dispatch) => {
    try {
        api.post(`actionToCancelNextBetOrderActivateUserApiCall`, {bet_id:betId}).then(() => {
            dispatch(actionToGetUserBetPredictionData(betId));
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToUpdatePreviousGameResult = (result,gameResultId,session_id) => async (dispatch) => {
    try {
        api.post(`actionToCallFunctionToUpdateGameResultApiCall`, {result,id:gameResultId}).then(() => {
            dispatch(actionToGetGameLastResultData(session_id));
        })
    } catch (error) {
        console.log(error);
    }
}