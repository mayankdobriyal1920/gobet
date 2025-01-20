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
    actionToGetAllUsersUnderSubAdminListApiCall
} from "../models/commonModel.js";
import {
    createNewSessionWithUserDataAndRole,
    deleteOldSessionFileFromSessionStore
} from "../models/helpers/commonModelHelper.js";
import { Vonage } from '@vonage/server-sdk';


const vonage = new Vonage({
    apiKey: "93669403",
    apiSecret: "47hxkbdWHmxyaGFv"
})
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
                    const otp = Math.floor(1000 + Math.random() * 9000);
                    console.log(otp);

                    //////// SEND OTP TO SMS ////////
                    // const from = "Get Bet"
                    // const to = `91${phone}`
                    // const text = 'Your otp to log in get bet app is '+otp;
                    //
                    // vonage.sms.send({to, from, text})
                    //     .then(resp => { console.log('Message sent successfully'); console.log(resp); })
                    //     .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
                    //////// SEND OTP TO SMS ////////

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
                    const otp = Math.floor(1000 + Math.random() * 9000);

                    console.log(otp);

                    //////// SEND OTP TO SMS ////////
                    // const from = "Get Bet"
                    // const to = `91${phone}`
                    // const text = 'Your otp to log in get bet app is '+otp;
                    //
                    // vonage.sms.send({to, from, text})
                    //     .then(resp => { console.log('Message sent successfully'); console.log(resp); })
                    //     .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
                    //////// SEND OTP TO SMS ////////

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
                    if (storeUserPhoneOtbObj[phone] == otp) {
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
        const {phone,otp,passcode}= req.body;
            if (storeUserPhoneOtbObj[phone] == otp){
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
                                        actionSignupApiCall({phone:phone, userId:passCodeData.user_id})
                                            .then(savedUser => {
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
                                                                /*responseToSend = {
                                                                    success:1, message:'User Registered Successfully'
                                                                }
                                                                res.status(200).send(responseToSend);*/

                                                                createNewSessionWithUserDataAndRole(req,user).then(()=>{
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
        // Check if the session exists and the user is logged in
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
    '/actionToGetUserBetPredictionHistoryApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGetUserBetPredictionHistoryApiCall(req?.session?.userSessionData?.id).then(responseData => {
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
    '/actionToGetAllUsersUnderSubAdminListApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToGetAllUsersUnderSubAdminListApiCall(req?.session?.userSessionData?.id).then(responseData => {
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
    '/actionToUpdateUserAliveForGameApiCall',
    expressAsyncHandler(async (req, res) => {
        if (req?.session?.userSessionData?.id) {
            actionToUpdateUserAliveForGameApiCall(req?.session?.userSessionData?.id).then(responseData => {
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
        let responseToSend = {
            success:0,
        }
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