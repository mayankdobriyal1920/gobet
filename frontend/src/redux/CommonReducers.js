import {
    USER_GET_OTP_REQUEST_FAIL,
    USER_GET_OTP_REQUEST_SUCCESS,
    USER_SESSION_REQUEST, USER_SESSION_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT
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