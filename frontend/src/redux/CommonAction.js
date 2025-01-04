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
    USER_WALLET_AND_GAME_BALANCE_SUCCESS
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
    dispatch({type: USER_WALLET_AND_GAME_BALANCE_REQUEST, payload: {open: false}});
    try {
        api.post(`actionToGetUserWalletAndGameBalanceApiCall`, {}).then(responseData => {
            dispatch({ type: USER_WALLET_AND_GAME_BALANCE_SUCCESS, payload: {...responseData?.data}});
        })
    } catch (error) {
        console.log(error);
    }
}