import Axios from 'axios';
import {USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS} from "./CommonConstants";
const api = Axios.create({
    baseURL: `https://gobet.onrender.com/api-call/common/`,
    withCredentials:true
})

export const actionToGetUserSessionData = () => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST});
    try {
        api.post(`actionToGetCurrentUserSessionDataApiCall`, {}).then(data => {
            console.log('data',data);
            if(data?.response?.status){
                dispatch({ type: USER_SIGNIN_SUCCESS, payload: {...data.response.userData}});
            }else{
                dispatch({type: USER_SIGNIN_FAIL, payload:'Auth Fail!',});
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