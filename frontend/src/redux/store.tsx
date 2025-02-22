import { createStore, compose, applyMiddleware,combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import {
    adminGameResultListReducer, allUsersNormalAndSunAdminListReducer,
    allUsersUnsetSubAdminListReducer,
    changeUserAvatarModal,
    generatedPasscodeListByAdminReducer, passcodeRequestBySubAdminReducer,
    pendingDepositRequestListReducer,
    pendingWithdrawalRequestListReducer,
    signupSigninFormError,
    userAuthDetailReducer,
    userBetPredictionHistoryReducer,
    userBetPredictionStatusReducer,
    userDepositAmountHistoryReducer,
    userGameHistoryReducer, userMoneyTransactionsReducer,
    userOtpReducer,
    userSessionReducer,
    userWalletAndGameBalanceReducer,
    userWithdrawalAmountHistoryReducer
} from './CommonReducers';

const initialState = {
    userSession: {loading: true, status:0},
    userAuthDetail: {userInfo: null, loading:false},
    userOtpDetails: {loading: false},
    signupSigninFormError: {},
    changeUserAvatarModal: {open:false},
    userWalletAndGameBalance: {loading:true,walletBalance:0,gameBalance:0,bettingBalance:0},
    userBetPredictionHistory: {loading:true,predictionHistory:[]},
    userGameHistory: {loading:true,gameHistory:[]},
    userMoneyTransactions: {loading:true,moneyTransactions:[]},
    userWithdrawalAmountHistory: {loading:true,withdrawalHistory:[]},
    userDepositAmountHistory: {loading:true,depositHistory:[]},
    adminGameResultList: {loading:true,gameResult:[]},
    pendingWithdrawalRequestList: {loading:true,withdrawalRequest:[]},
    pendingDepositRequestList: {loading:true,depositRequest:[]},
    allUsersUnsetSubAdminList: {loading:true,userData:[]},
    allUsersNormalAndSunAdminList: {loading:true,userData:[]},
    generatedPasscodeListByAdmin: {loading:true,passcodeList:[]},
    passcodeRequestBySubAdmin: {loading:true,passcodeRequest:{}},
    userBetPredictionStatus: {status:0,prediction:{bet_id:'20250103100051250',min:1,option_name:'SMALL',amount:0},timer:60,dateTime:new Date()},
}
export const rootReducer = combineReducers({
    userSession: userSessionReducer,
    userWithdrawalAmountHistory: userWithdrawalAmountHistoryReducer,
    allUsersNormalAndSunAdminList: allUsersNormalAndSunAdminListReducer,
    userDepositAmountHistory: userDepositAmountHistoryReducer,
    allUsersUnsetSubAdminList: allUsersUnsetSubAdminListReducer,
    adminGameResultList: adminGameResultListReducer,
    pendingDepositRequestList: pendingDepositRequestListReducer,
    generatedPasscodeListByAdmin: generatedPasscodeListByAdminReducer,
    pendingWithdrawalRequestList: pendingWithdrawalRequestListReducer,
    userAuthDetail: userAuthDetailReducer,
    userOtpDetails: userOtpReducer,
    signupSigninFormError: signupSigninFormError,
    changeUserAvatarModal: changeUserAvatarModal,
    userWalletAndGameBalance: userWalletAndGameBalanceReducer,
    userBetPredictionStatus: userBetPredictionStatusReducer,
    userBetPredictionHistory: userBetPredictionHistoryReducer,
    passcodeRequestBySubAdmin: passcodeRequestBySubAdminReducer,
    userGameHistory: userGameHistoryReducer,
    userMoneyTransactions: userMoneyTransactionsReducer,
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancer =  window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const store = createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
export type RootState = ReturnType<typeof rootReducer>
export default store;
