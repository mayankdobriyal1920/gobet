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
    USER_BET_PREDICTION_STATUS_REQUEST,
    USER_BET_PREDICTION_STATUS_TIMER,
    USER_BET_PREDICTION_HISTORY_REQUEST,
    USER_BET_PREDICTION_HISTORY_SUCCESS
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

export const actionToStartTimeIntervalOfUserTime = () => async (dispatch, getState) => {
    // Retrieve the previous date-time from the Redux state
    let prevDateTime = getState().userBetPredictionStatus.dateTime;

    // Start an interval to calculate the seconds difference
    let timeInterval = setInterval(() => {
        // Get the current time
        let currentDateTime = new Date();

        // Calculate the difference in seconds between the current and previous time
        let secondCount = Math.floor((currentDateTime - new Date(prevDateTime)) / 1000);

        // Check if the interval has reached 60 seconds
        if (secondCount >= 60) {
            clearInterval(timeInterval); // Stop the interval
            dispatch({type: USER_BET_PREDICTION_STATUS_REQUEST});
        } else {
            // Dispatch the remaining seconds as a negative countdown
            dispatch({
                type: USER_BET_PREDICTION_STATUS_TIMER,
                payload: secondCount - 59, // Adjusting to create a countdown effect
            });
        }
    }, 1000); // Execute the interval every 1 second
};

export const actionToGetUserBetPredictionData = () => async (dispatch) => {
    dispatch({type: USER_BET_PREDICTION_STATUS_REQUEST});
    try {
        api.post(`actionToGetUserBetPredictionDataApiCall`, {}).then(responseData => {
            if(responseData?.data?.success) {
                dispatch({type: USER_BET_PREDICTION_STATUS, payload: {...responseData?.data.prediction}});
                dispatch(actionToStartTimeIntervalOfUserTime());
            }else{
                setTimeout(()=>{
                    dispatch(actionToGetUserBetPredictionData());
                },5000)
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionToDeductPercentOfUserGameBalanceAndMakeUserAliveForGame = (callFunctionToEnterInGame) => async (dispatch) => {
    try {
        api.post(`actionToDeductPercentOfUserGameBalanceAndMakeUserAliveForGameApiCall`, {}).then(() => {
            if(callFunctionToEnterInGame) {
                dispatch(actionToGetUserWalletAndGameBalance());
                callFunctionToEnterInGame();
            }
        })
    } catch (error) {
        console.log(error);
    }
}