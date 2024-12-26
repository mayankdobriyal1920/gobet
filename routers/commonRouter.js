import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
    actionSignupApiCall,
    actionToLoginUserAndSendOtpApiCall,
    actionToSendOtpApiCall,
    actionToVerifyLoginUserOtpApiCall, actionUpdatePassCodeApiCall, actionValidatePassCodeApiCall
} from "../models/commonModel.js";
import {
    createNewSessionWithUserDataAndRole,
    deleteOldSessionFileFromSessionStore
} from "../models/helpers/commonModelHelper.js";
const otpFilePath = './data.json'; // Path to your JSON file
import fs from 'fs';
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
                        success:0, message:'Mobile no already registered'
                    }
                    res.status(200).send(responseToSend);
                }else{
                    const otp = Math.floor(1000 + Math.random() * 9000);
                    console.log(otp);
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
        actionToVerifyLoginUserOtpApiCall(req.body)
            .then(user => {
                if(user?.id) {
                    createNewSessionWithUserDataAndRole(req,user).then(()=>{
                        res.status(200).send({
                            success: 1,
                            userData:user,
                            message: 'Session data retrieved successfully',
                        });
                    })
                }else {
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
                                success:0, message:'Mobile no already registered'
                            }
                            res.status(200).send(responseToSend);
                        }else{
                            actionValidatePassCodeApiCall(passcode)
                                .then(passCodeData => {
                                    if(!passCodeData?.id) {
                                        responseToSend = {
                                            success:0, message:'Pass code is not valid'
                                        }
                                        res.status(200).send(responseToSend);
                                    }else{
                                        const passCodeId = passCodeData.id;
                                        actionSignupApiCall({phone:phone, userId:passCodeData.user_id})
                                            .then(savedUser => {
                                                if(!savedUser?.id) {
                                                    responseToSend = {
                                                        success:0, message:'Something went wrong while saving data in user table'
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
                                                                    success:0, message:'User Registered but issue while updating pass code table'
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
                    success: 0, message: 'OTP is not correct'
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
            res.status(200).send({
                success: true,
                userData:req?.session?.userSessionData,
                message: 'Session data retrieved successfully',
            });
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

export default commonRouter;