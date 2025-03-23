import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
    actionGetUserByIdApiCall,
    actionSignupApiCall,
    actionToUpdateUserAliveForGameApiCall,
    actionToGetUserBetPredictionDataApiCall,
    actionToGetUserBetPredictionHistoryApiCall,
    actionToGetUserWalletAndGameBalanceApiCall,
    actionToLoginUserAndSendOtpApiCall,
    actionToSendOtpApiCall,
    actionToTransferAmountFromUserMainWalletToGameWalletApiCall,
    actionToVerifyLoginUserOtpApiCall,
    actionUpdateAvatarApiCall,
    actionUpdatePassCodeApiCall,
    actionValidatePassCodeApiCall,
    actionUpdateUserNameApiCall,
    actionToGetCurrentUserProfileDataApiCall,
    actionTransferMoneyToMainWalletApiCall,
    actionToGenerateWithdrawalRequestAndDeductAmountApiCall,
    actionToGenerateDepositRequestApiCall,
    actionToCompleteStatusOfDepositRequestApiCall,
    actionToCompleteStatusOfWithdrawalRequestApiCall,
    actionToGetWithdrawalRequestHistoryDataApiCall,
    actionToGetDepositRequestHistoryDataApiCall,
    actionToGetAdminGameResultListDataApiCall,
    actionToCallFunctionToUpdateGameResultApiCall,
    actionToGetPendingWithdrawalRequestListDataApiCall,
    actionToGetAllUsersUnderSubAdminListApiCall,
    actionToGetGameHistoryDataApiCall,
    actionToGetPendingDepositRequestListDataApiCall,
    actionToGetAdminUserPasscodeListDataListApiCall,
    actionToGetPasscodeRequestBySubAdminApiCall,
    actionToGeneratePasscodeRequestBySubAdminApiCall,
    actionToGetAllUsersNormalAndSubAdminListApiCall,
    actionToUpdateUserRoleApiCall,
    actionToApprovePasscodeRequestAndGeneratePasscodeApiCall,
    actionToGetMoneyTransactionDataApiCall,
    actionToMakeCurrentUserInactiveApiCall,
    actionToOrderNextBetActivateUserApiCall,
    actionToCancelNextBetOrderActivateUserApiCall,
    actionToGetNearestGameSessionOrActiveSessionAndGamePlatformApiCall,
    actionToCallFunctionToActiveSectionAndStartGameApiCall,
    actionToGetBetActiveUserDataApiCall,
    actionToGetBetGameSessionDataApiCall,
    actionToGetGameLastResultDataApiCall,
    actionToGetUserActiveSubscriptionDataApiCall,
    actionToGetAppSubscriptionPlanDataApiCall,
    actionToActivateSubscriptionPlanApiCall,
    actionToGetGameSessionOrAllSessionAndGamePlatformApiCall,
    actionToGetGamePlatformDataApiCall,
    actionToSaveGameSessionDataApiCall,
    actionToDeleteGameSessionDataApiCall,
    actionToInactiveCurrentSessionApiCall,
    actionToGetAdminAllDashboardCountDataApiCall,
    actionToGetAllUsersSubscriptionsDataApiCall, actionToUpdateIsOnlineUseDataApiCall
} from "../models/commonModel.js";
import {
    callFunctionToSendOtp,
    createNewSessionWithUserDataAndRole,
    deleteOldSessionFileFromSessionStore
} from "../models/helpers/commonModelHelper.js";


const commonRouter = express.Router();
let storeUserPhoneOtbObj = {};

commonRouter.post(
    '/actionToLoginUserAndSendOtpApiCall',
    expressAsyncHandler(async (req, res) => {
        let responseToSend = {
            success:0,
        }
        actionToLoginUserAndSendOtpApiCall(req.body)
            .then(user => {
                if(user?.id) {
                    responseToSend = {
                        success:1,
                    }
                    res.status(200).send(responseToSend);
                }else{
                    res.status(200).send(responseToSend);
                }
            }).catch(error => {
            res.status(500).send(error);
        })
    })
);

commonRouter.post(
    '/actionToGetNearestGameSessionOrActiveSessionAndGamePlatformApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetNearestGameSessionOrActiveSessionAndGamePlatformApiCall(req.body)
            .then(data => {
                res.status(200).send(data);
            }).catch(error => {
            res.status(500).send(error);
        })
    })
);

commonRouter.post(
    '/actionToGetGameSessionOrAllSessionAndGamePlatformApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetGameSessionOrAllSessionAndGamePlatformApiCall()
            .then(data => {
                res.status(200).send(data);
            }).catch(error => {
            res.status(500).send(error);
        })
    })
);

commonRouter.post(
    '/actionToSaveGameSessionDataApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToSaveGameSessionDataApiCall(req?.session?.userSessionData?.id,req.body)
                .then(data => {
                    res.status(200).send(data);
                }).catch(error => {
                res.status(500).send(error);
            })
        }
    })
);

commonRouter.post(
    '/actionToDeleteGameSessionDataApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToDeleteGameSessionDataApiCall(req.body)
                .then(data => {
                    res.status(200).send(data);
                }).catch(error => {
                res.status(500).send(error);
            })
        }
    })
);

commonRouter.post(
    '/actionToGetGamePlatformDataApiCall',
    expressAsyncHandler(async (req, res) => {
        actionToGetGamePlatformDataApiCall()
            .then(data => {
                res.status(200).send(data);
            }).catch(error => {
            res.status(500).send(error);
        })
    })
);

commonRouter.post(
    '/actionToUpdateIsOnlineUseDataApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToUpdateIsOnlineUseDataApiCall(req?.session?.userSessionData?.id,req.body)
                .then(data => {
                    res.status(200).send(data);
                }).catch(error => {
                res.status(500).send(error);
            })
        }
    })
);

commonRouter.post(
    '/actionToUpdateBettingUserIsOnlineUseDataApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToUpdateBettingUserIsOnlineUseDataApiCall(req?.session?.userSessionData?.id,req.body)
                .then(data => {
                    res.status(200).send(data);
                }).catch(error => {
                res.status(500).send(error);
            })
        }
    })
);

commonRouter.post(
    '/actionToSendOtpApiCall',
    expressAsyncHandler(async (req, res) => {
        let responseToSend = {
            success:0,
        }
        const phone = req.body.phone;
        actionToSendOtpApiCall(req.body)
            .then(user => {
                if(user?.id) {
                    responseToSend = {
                        success:0,
                        error:'phone',
                        message:'Mobile no already registered'
                    }
                    res.status(200).send(responseToSend);
                }else{
                   // const otp = Math.floor(1000 + Math.random() * 9000);
                    const otp = 1234;
                    console.log(otp);

                    callFunctionToSendOtp(phone,otp);

                    storeUserPhoneOtbObj[phone] = otp;
                    responseToSend = {
                        success:1,
                    }
                    res.status(200).send(responseToSend);
                }
            }).catch(error => {
            res.status(500).send(error);
        })
    })
);

commonRouter.post(
    '/actionToSendOtpForLoginApiCall',
    expressAsyncHandler(async (req, res) => {
        let responseToSend = {
            success:0,
        }
        const phone = req.body.phone;
        actionToSendOtpApiCall(req.body)
            .then(user => {
                if(!user?.id) {
                    responseToSend = {
                        success:0,
                        error:'phone',
                        message:'Mobile not registered'
                    }
                    res.status(200).send(responseToSend);
                }else{
                    //const otp = Math.floor(1000 + Math.random() * 9000);
                    const otp = 1234;
                    console.log(otp);

                    callFunctionToSendOtp(phone,otp);

                    storeUserPhoneOtbObj[phone] = otp;
                    responseToSend = {
                        success:1,
                    }
                    res.status(200).send(responseToSend);
                }
            }).catch(error => {
            res.status(500).send(error);
        })
    })
);

commonRouter.post(
    '/actionToVerifyLoginUserOtpApiCall',
    expressAsyncHandler(async (req, res) => {
        let responseToSend = {
            success:0,
        }
        const otp = req.body.otp;
        const phone = req.body.phone;
        actionToVerifyLoginUserOtpApiCall(req.body.phone)
            .then(user => {
                if(user?.id) {
                    if (Number(storeUserPhoneOtbObj[phone]) === Number(otp)) {
                        createNewSessionWithUserDataAndRole(req, user).then(() => {
                            res.status(200).send({
                                success: 1,
                                userData: user,
                                message: 'Session data retrieved successfully',
                            });
                        })
                }else {
                        responseToSend = {
                            success: 0,
                            error:'otp',
                            message: 'OTP is not correct'
                        }
                        res.status(200).send(responseToSend);
                    }
                }else {
                    responseToSend = {
                        success:0,
                        error:'phone',
                        message:'Mobile not registered'
                    }
                    res.status(200).send(responseToSend);
                }
            }).catch(error => {
            res.status(500).send(error);
        })
    })
);

commonRouter.post(
    '/actionToSignupUserApiCall',
    expressAsyncHandler(async (req, res) => {
        let responseToSend = {
            success:0,
        }
        const {phone,otp,passcode,name,uid}= req.body;
            if (Number(storeUserPhoneOtbObj[phone]) === Number(otp)){
                actionToSendOtpApiCall(phone)
                    .then(user => {
                        if(user?.id) {
                            responseToSend = {
                                success:0,
                                error:'phone',
                                message:'Mobile no already registered'
                            }
                            res.status(200).send(responseToSend);
                        }else{
                            actionValidatePassCodeApiCall(passcode)
                                .then(passCodeData => {
                                    if(!passCodeData?.id) {
                                        responseToSend = {
                                            success:0,
                                            error:'passcode',
                                            message:'Pass code is not valid'
                                        }
                                        res.status(200).send(responseToSend);
                                    }else{
                                        const passCodeId = passCodeData.id;
                                        const passCodeRole = passCodeData.role;
                                        actionSignupApiCall({phone:phone,name:name,uid:uid,role:passCodeRole, userId:passCodeData.user_id})
                                            .then(savedUser => {
                                                console.log(savedUser);
                                                if(!savedUser?.id) {
                                                    responseToSend = {
                                                        success:0,
                                                        error:'passcode',
                                                        message:'Something went wrong while saving data in user table'
                                                    }
                                                    res.status(200).send(responseToSend);
                                                }else{
                                                    const newUser = savedUser;
                                                    const newUserId = newUser?.id;
                                                    actionUpdatePassCodeApiCall({passCodeId: passCodeId, newUserId: newUserId})
                                                        .then(updatedPassCode => {
                                                            if(updatedPassCode?.status && updatedPassCode?.status === 'success') {
                                                                createNewSessionWithUserDataAndRole(req,newUser).then(()=>{
                                                                    res.status(200).send({
                                                                        success: 1,
                                                                        userData:newUser,
                                                                        message: 'Session data retrieved successfully',
                                                                    });
                                                                })
                                                            }else{
                                                                responseToSend = {
                                                                    success:0,
                                                                    error:'passcode',
                                                                    message:'User Registered but issue while updating pass code table'
                                                                }
                                                                res.status(200).send(responseToSend);
                                                            }
                                                        }).catch(error => {
                                                        res.status(500).send(error);
                                                    })
                                                }
                                            }).catch(error => {
                                            res.status(500).send(error);
                                        })
                                    }
                                }).catch(error => {
                                res.status(500).send(error);
                            })
                        }
                    }).catch(error => {
                    res.status(500).send(error);
                })
            }else{
                responseToSend = {
                    success: 0,
                    error:'otp',
                    message: 'OTP is not correct'
                }
                res.status(200).send(responseToSend);
            }

    })
);

commonRouter.post(
    '/actionToGetCurrentUserSessionDataApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGetCurrentUserProfileDataApiCall(req?.session?.userSessionData?.id).then(responseData => {
                res.status(200).send({
                    success: true,
                    userData:responseData,
                    message: 'Session data retrieved successfully',
                });
            })
        } else {
            // If no session found, return unauthorized response
            res.status(200).send({
                success: false,
                message: 'No active session found. User is not logged in.',
            });
        }
    })
);

commonRouter.post(
    '/actionToGetCurrentUserProfileDataApiCall',
    expressAsyncHandler(async (req, res) => {
        // Check if the session exists and the user is logged in
        if (req?.session?.userSessionData?.id) {
            actionToGetCurrentUserProfileDataApiCall(req?.session?.userSessionData?.id).then(responseData => {
                res.status(200).send(responseData);
            })
        } else {
            // If no session found, return unauthorized response
            res.status(200).send({
                success: false,
                message: 'No active session found. User is not logged in.',
            });
        }
    })
);

commonRouter.post(
    '/actionToGetPasscodeRequestBySubAdminApiCall',
    expressAsyncHandler(async (req, res) => {
        // Check if the session exists and the user is logged in
        if (req?.session?.userSessionData?.id) {
            actionToGetPasscodeRequestBySubAdminApiCall(req?.session?.userSessionData?.id).then(responseData => {
                res.status(200).send(responseData);
            })
        } else {
            // If no session found, return unauthorized response
            res.status(200).send({
                success: false,
                message: 'No active session found. User is not logged in.',
            });
        }
    })
);

commonRouter.post(
    '/actionToGeneratePasscodeRequestBySubAdminApiCall',
    expressAsyncHandler(async (req, res) => {
        // Check if the session exists and the user is logged in
        if (req?.session?.userSessionData?.id) {
            actionToGeneratePasscodeRequestBySubAdminApiCall(req?.session?.userSessionData?.id,req.body).then(responseData => {
                res.status(200).send(responseData);
            })
        } else {
            // If no session found, return unauthorized response
            res.status(200).send({
                success: false,
                message: 'No active session found. User is not logged in.',
            });
        }
    })
);

commonRouter.post(
    '/actionToApprovePasscodeRequestAndGeneratePasscodeApiCall',
    expressAsyncHandler(async (req, res) => {
        // Check if the session exists and the user is logged in
        if (req?.session?.userSessionData?.id) {
            actionToApprovePasscodeRequestAndGeneratePasscodeApiCall(req?.session?.userSessionData?.id,req.body).then(responseData => {
                res.status(200).send(responseData);
            })
        } else {
            // If no session found, return unauthorized response
            res.status(200).send({
                success: false,
                message: 'No active session found. User is not logged in.',
            });
        }
    })
);

commonRouter.post(
    '/actionToUpdateUserRoleApiCall',
    expressAsyncHandler(async (req, res) => {
        // Check if the session exists and the user is logged in
        if (req?.session?.userSessionData?.id) {
            actionToUpdateUserRoleApiCall(req.body).then(responseData => {
                res.status(200).send(responseData);
            })
        } else {
            // If no session found, return unauthorized response
            res.status(200).send({
                success: false,
                message: 'No active session found. User is not logged in.',
            });
        }
    })
);

commonRouter.post(
    '/actionToLogoutUserSessionApiCall',
    expressAsyncHandler(async (req, res) => {
        // Check if the session exists and the user is logged in
        const oldSessionId = req?.session?.id;
        deleteOldSessionFileFromSessionStore(oldSessionId).then(() => {
            req?.session?.destroy();
            res.status(200).send({
                success: true,
                message: 'User logged out',
            });
        });
    })
);

commonRouter.post(
    '/actionToGetUserWalletAndGameBalanceApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGetUserWalletAndGameBalanceApiCall(req?.session?.userSessionData?.id).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                wallet_balance:0,
                game_balance:0
            });
        }
    })
);

commonRouter.post(
    '/actionToGetBetActiveUserDataApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGetBetActiveUserDataApiCall(req?.session?.userSessionData?.id).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                wallet_balance:0,
                game_balance:0
            });
        }
    })
);

commonRouter.post(
    '/actionToGetBetGameSessionDataApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGetBetGameSessionDataApiCall(req.body.session_id).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                wallet_balance:0,
                game_balance:0
            });
        }
    })
);

commonRouter.post(
    '/actionToGetGameLastResultDataApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGetGameLastResultDataApiCall(req.body.session_id).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                wallet_balance:0,
                game_balance:0
            });
        }
    })
);

commonRouter.post(
    '/actionToGetAdminAllDashboardCountDataApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id && req?.session?.userSessionData?.role === 1) {
            actionToGetAdminAllDashboardCountDataApiCall().then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                total_transactions_count: 0,
                total_transaction_amount: 0,
                game_transactions_count: 0,
                game_transaction_amount: 0,
                todays_earning: 0,
                total_earning: 0,
                todays_betting: 0,
                total_betting: 0,
                online_users: 0,
                playing_users: 0,
                current_orders_count: 0,
                total_orders_count: 0,
                total_betting_balance: 0,
                total_subscriptions: 0,
                total_active_subscriptions: 0
            });
        }
    })
);

commonRouter.post(
    '/actionToGetUserActiveSubscriptionDataApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGetUserActiveSubscriptionDataApiCall(req?.session?.userSessionData?.id).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                wallet_balance:0,
                game_balance:0
            });
        }
    })
);

commonRouter.post(
    '/actionToGetAppSubscriptionPlanDataApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGetAppSubscriptionPlanDataApiCall(req?.session?.userSessionData?.id).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                wallet_balance:0,
                game_balance:0
            });
        }
    })
);

commonRouter.post(
    '/actionToGetUserBetPredictionDataApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id && req.body.betting_active_users_id) {
            actionToGetUserBetPredictionDataApiCall(req?.session?.userSessionData?.id,req.body.betting_active_users_id).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                success:5,
            });
        }
    })
);

commonRouter.post(
    '/actionToActivateSubscriptionPlanApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToActivateSubscriptionPlanApiCall(req?.session?.userSessionData?.id,req.body.plan).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                success:0,
            });
        }
    })
);
commonRouter.post(
    '/actionToMakeCurrentUserInactiveApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id && req.body.betting_active_users_id) {
            actionToMakeCurrentUserInactiveApiCall(req.body.betting_active_users_id).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                success:false,
            });
        }
    })
);


commonRouter.post(
    '/actionToGetUserBetPredictionHistoryApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGetUserBetPredictionHistoryApiCall(req?.session?.userSessionData?.id,req.body.sessionId).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send([]);
        }
    })
);

commonRouter.post(
    '/actionToGetWithdrawalRequestHistoryDataApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGetWithdrawalRequestHistoryDataApiCall(req?.session?.userSessionData?.id,req.body).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send([]);
        }
    })
);


commonRouter.post(
    '/actionToGetDepositRequestHistoryDataApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGetDepositRequestHistoryDataApiCall(req?.session?.userSessionData?.id,req.body).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send([]);
        }
    })
);

commonRouter.post(
    '/actionToGetGameHistoryDataApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGetGameHistoryDataApiCall(req?.session?.userSessionData?.id,req?.session?.userSessionData?.role,req.body).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send([]);
        }
    })
);

commonRouter.post(
    '/actionToGetAllUsersSubscriptionsDataApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id && req?.session?.userSessionData?.role === 1) {
            actionToGetAllUsersSubscriptionsDataApiCall(req.body).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send([]);
        }
    })
);

commonRouter.post(
    '/actionToGetMoneyTransactionDataApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGetMoneyTransactionDataApiCall(req?.session?.userSessionData?.id,req?.session?.userSessionData?.role,req.body).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send([]);
        }
    })
);

commonRouter.post(
    '/actionToGetAdminGameResultListDataApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGetAdminGameResultListDataApiCall(req?.session?.userSessionData?.id,req.body).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send([]);
        }
    })
);

commonRouter.post(
    '/actionToGetPendingWithdrawalRequestListDataApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGetPendingWithdrawalRequestListDataApiCall(req?.session?.userSessionData?.id, req.body).then(responseData => {
                res.status(200).send(responseData);
            });
        }else{
            res.status(200).send([]);
        }
    })
);

commonRouter.post(
    '/actionToGetPendingDepositRequestListDataApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGetPendingDepositRequestListDataApiCall(req?.session?.userSessionData?.id, req.body).then(responseData => {
                res.status(200).send(responseData);
            });
        }else{
            res.status(200).send([]);
        }
    })
);

commonRouter.post(
    '/actionToGetAdminUserPasscodeListDataListApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGetAdminUserPasscodeListDataListApiCall(req?.session?.userSessionData?.id,req.body).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                success: false,
                message: 'No active session found. User is not logged in.',
            });
        }
    })
);


commonRouter.post(
    '/actionToGetAllUsersUnderSubAdminListApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGetAllUsersUnderSubAdminListApiCall(req?.session?.userSessionData?.id, req.body).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send([]);
        }
    })
);

commonRouter.post(
    '/actionToGetAllUsersNormalAndSubAdminListApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGetAllUsersNormalAndSubAdminListApiCall(req?.session?.userSessionData?.id, req.body).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                success: false,
                message: 'No active session found. User is not logged in.',
            });
        }
    })
);

commonRouter.post(
    '/actionToCallFunctionToUpdateGameResultApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToCallFunctionToUpdateGameResultApiCall(req?.session?.userSessionData?.id,req.body).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send([]);
        }
    })
);

commonRouter.post(
    '/actionToInactiveCurrentSessionApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToInactiveCurrentSessionApiCall(req.body).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send([]);
        }
    })
);

commonRouter.post(
    '/actionToUpdateUserAliveForGameApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToUpdateUserAliveForGameApiCall(req?.session?.userSessionData?.id,req.body.sessionId,req.body.platformId).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                success: false,
                message: 'No active session found. User is not logged in.',
            });
        }
    })
);

commonRouter.post(
    '/actionToCallFunctionToActiveSectionAndStartGameApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToCallFunctionToActiveSectionAndStartGameApiCall(req?.session?.userSessionData?.id,req.body.sessionId).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                success: false,
                message: 'No active session found. User is not logged in.',
            });
        }
    })
);

commonRouter.post(
    '/actionToOrderNextBetActivateUserApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToOrderNextBetActivateUserApiCall(req.body.bet_id,req?.session?.userSessionData?.id).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                success: false,
                message: 'No active session found. User is not logged in.',
            });
        }
    })
);

commonRouter.post(
    '/actionToCancelNextBetOrderActivateUserApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToCancelNextBetOrderActivateUserApiCall(req.body.bet_id).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                success: false,
                message: 'No active session found. User is not logged in.',
            });
        }
    })
);

commonRouter.post(
    '/actionToTransferAmountFromUserMainWalletToGameWalletApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToTransferAmountFromUserMainWalletToGameWalletApiCall(req?.session?.userSessionData?.id,req.body).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                success: false,
                message: 'No active session found. User is not logged in.',
            });
        }
    })
);

commonRouter.post(
    '/actionToGenerateWithdrawalRequestAndDeductAmountApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGenerateWithdrawalRequestAndDeductAmountApiCall(req?.session?.userSessionData?.id,req.body).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                success: false,
                message: 'No active session found. User is not logged in.',
            });
        }
    })
);

commonRouter.post(
    '/actionToGenerateDepositRequestApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGenerateDepositRequestApiCall(req?.session?.userSessionData?.id,req.body).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                success: false,
                message: 'No active session found. User is not logged in.',
            });
        }
    })
);

commonRouter.post(
    '/actionToCompleteStatusOfDepositRequestApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToCompleteStatusOfDepositRequestApiCall(req?.session?.userSessionData?.id,req.body).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                success: false,
                message: 'No active session found. User is not logged in.',
            });
        }
    })
);

commonRouter.post(
    '/actionToCompleteStatusOfWithdrawalRequestApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToCompleteStatusOfWithdrawalRequestApiCall(req?.session?.userSessionData?.id,req.body).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                success: false,
                message: 'No active session found. User is not logged in.',
            });
        }
    })
);

commonRouter.post(
    '/actionTransferMoneyToMainWalletApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionTransferMoneyToMainWalletApiCall(req?.session?.userSessionData?.id).then(responseData => {
                res.status(200).send(responseData);
            })
        }else{
            res.status(200).send({
                success: false,
                message: 'No active session found. User is not logged in.',
            });
        }
    })
);

commonRouter.post(
    '/actionUpdateAvatarApiCall',
    expressAsyncHandler(async (req, res) => {
        const userId = req.body.userId;
        actionUpdateAvatarApiCall(req.body)
            .then(responseData => {
                if(responseData?.status && responseData?.status === 'success') {
                    actionGetUserByIdApiCall(userId)
                        .then(user => {
                            res.status(200).send({
                                success: 1,
                                userData: user,
                                message: 'Avatar updated successfully',
                            });
                        }).catch(error => {
                        res.status(500).send(error);
                    })
                }
            }).catch(error => {
            res.status(500).send(error);
        })
    })
);


commonRouter.post(
    '/actionUpdateNameApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            const userId = req?.session?.userSessionData?.id;
            actionUpdateUserNameApiCall(req.body.name, userId)
                .then(responseData => {
                    if (responseData?.status && responseData?.status === 'success') {
                        actionGetUserByIdApiCall(userId)
                            .then(user => {
                                res.status(200).send({
                                    success: 1,
                                    userData: user,
                                    message: 'Name updated successfully',
                                });
                            }).catch(error => {
                            res.status(500).send(error);
                        })
                    }
                }).catch(error => {
                res.status(500).send(error);
            })
        }else{
            res.status(200).send({
                success: false,
                message: 'No active session found. User is not logged in.',
            });
        }
    })
);

export default commonRouter;