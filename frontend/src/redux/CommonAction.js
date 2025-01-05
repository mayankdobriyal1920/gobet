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
    USER_BET_PREDICTION_STATUS_READY, USER_BET_PREDICTION_STATUS_READY_TIMER
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

export const actionToSendOtp = (phone) => async (dispatch) => {
    try {
        api.post(`actionToSendOtpApiCall`, {phone}).then(responseData => {
            if(responseData?.data?.success){
                dispatch({ type: USER_GET_OTP_REQUEST_SUCCESS, payload: {}});
            }else{
                dispatch({ type: USER_GET_OTP_REQUEST_FAIL, payload: {}});
                dispatch({ type: USER_SIGNUP_SIGNIN_ERROR, payload: {error: responseData?.data?.error, message: responseData?.data?.message}});
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToSendOtpForLogin = (phone) => async (dispatch) => {
    try {
        api.post(`actionToSendOtpForLoginApiCall`, {phone}).then(responseData => {
            if(responseData?.data?.success){
                dispatch({ type: USER_GET_OTP_REQUEST_SUCCESS, payload: {}});
            }else{
                dispatch({ type: USER_GET_OTP_REQUEST_FAIL, payload: {}});
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

export const actionToGetUserWalletAndGameBalance = () => async (dispatch) => {
    dispatch({type: USER_WALLET_AND_GAME_BALANCE_REQUEST});
    try {
        api.post(`actionToGetUserWalletAndGameBalanceApiCall`, {}).then(responseData => {
            dispatch({ type: USER_WALLET_AND_GAME_BALANCE_SUCCESS, payload: {...responseData?.data}});
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToGetUserBetPredictionHistory = () => async (dispatch) => {
    dispatch({type: USER_BET_PREDICTION_HISTORY_REQUEST});
    try {
        api.post(`actionToGetUserBetPredictionHistoryApiCall`, {}).then(responseData => {
            dispatch({ type: USER_BET_PREDICTION_HISTORY_SUCCESS, payload: {...responseData?.data}});
        })
    } catch (error) {
        console.log(error);
    }
}

let betStateTimeInterval = null;
export const actionToStartTimeIntervalOfUserTime = (betting_active_users_id) => async (dispatch, getState) => {
    // Retrieve the previous date-time from the Redux state
    let prevDateTime = getState().userBetPredictionStatus.dateTime;

    // Start an interval to calculate the seconds difference
    betStateTimeInterval = setInterval(() => {
        // Get the current time
        let currentDateTime = new Date();

        // Calculate the difference in seconds between the current and previous time
        let secondCount = Math.floor((currentDateTime - new Date(prevDateTime)) / 1000);

        // Check if the interval has reached 60 seconds
        if (secondCount >= 60) {
            clearInterval(betStateTimeInterval); // Stop the interval
            dispatch({type: USER_BET_PREDICTION_STATUS_WAITING});
            /////// call set timer for waiting state ///////////
            dispatch(actionToRecallTimeoutForGetBetUser(betting_active_users_id,0));
            /////// call set timer for waiting state ///////////
        } else {
            // Dispatch the remaining seconds as a countdown from 60
            dispatch({
                type: USER_BET_PREDICTION_STATUS_TIMER,
                payload: 60 - secondCount, // Countdown from 60 seconds
            });
        }
    }, 1000); // Execute the interval every 1 second
};

let readyStateTimeInterval = null

export const actionToStartTimeIntervalReadyStateTimer = (betting_active_users_id) => async (dispatch, getState) => {
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
};


let getPredictionTimeOut = null;

export const actionToRecallTimeoutForGetBetUser = (betting_active_users_id,wait = 5000) => async (dispatch) => {
    /////////// CHECK REGULAR FOR BET PROGRESS ////////
    getPredictionTimeOut = setTimeout(() => {
        dispatch(actionToGetUserBetPredictionData(betting_active_users_id, false));
    },wait)
    /////////// CHECK REGULAR FOR BET PROGRESS ////////
}
export const actionToGetUserBetPredictionData = (betting_active_users_id,loading = false) => async (dispatch) => {

    if(loading){
        dispatch({type: USER_BET_PREDICTION_STATUS_LOADING_REQUEST});
    }

    if(betting_active_users_id && !isNaN(betting_active_users_id)) {
        try {
            api.post(`actionToGetUserBetPredictionDataApiCall`, {betting_active_users_id}).then(responseData => {
                if (responseData?.data?.success === 5) {
                    dispatch({type: USER_BET_PREDICTION_STATUS_EXPIRED});
                } else if (responseData?.data?.success === 1) {

                    if(responseData?.data.prediction?.status === 3){
                        dispatch({type: USER_BET_PREDICTION_STATUS_WAITING});
                        /////// call set timer for waiting state ///////////
                        dispatch(actionToRecallTimeoutForGetBetUser(betting_active_users_id));
                        /////// call set timer for waiting state ///////////
                    }else if(responseData?.data.prediction?.status === 2){
                        if(!readyStateTimeInterval) {
                            dispatch({type: USER_BET_PREDICTION_STATUS_READY});
                            dispatch(actionToStartTimeIntervalReadyStateTimer(betting_active_users_id));
                        }
                        /////// call set timer for waiting state ///////////
                        dispatch(actionToRecallTimeoutForGetBetUser(betting_active_users_id));
                        /////// call set timer for waiting state ///////////
                    }else if(responseData?.data.prediction?.status === 1) {
                        dispatch({type: USER_BET_PREDICTION_STATUS, payload: {...responseData?.data.prediction}});
                        if(!betStateTimeInterval) {
                            dispatch(actionToStartTimeIntervalOfUserTime(betting_active_users_id));
                        }
                        ///////// REMOVE TIME OUT TIMER ON FOUND STATE ///////////
                        if(getPredictionTimeOut){
                            clearTimeout(getPredictionTimeOut);
                        }
                        ///////// REMOVE TIME OUT TIMER ON FOUND STATE ///////////
                    }else if(responseData?.data.prediction?.status === 0 || responseData?.data.prediction?.status === 4) {
                          if(getPredictionTimeOut){
                              clearTimeout(getPredictionTimeOut);
                          }
                          dispatch({type: USER_BET_PREDICTION_STATUS_EXPIRED});
                    }

                }
            })
        } catch (error) {
            console.log(error);
        }
    }else{
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