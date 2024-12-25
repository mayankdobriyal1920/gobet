import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {actionToLoginUserAndSendOtpApiCall, actionToVerifyLoginUserOtpApiCall} from "../models/commonModel.js";
import {
    createNewSessionWithUserDataAndRole,
    deleteOldSessionFileFromSessionStore
} from "../models/helpers/commonModelHelper.js";
const commonRouter = express.Router();

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
    '/actionToGetCurrentUserSessionDataApiCall',
    expressAsyncHandler(async (req, res) => {
        console.log('req?.session',req?.session);
        // Check if the session exists and the user is logged in
        if (req?.session?.userSessionData?.id) {
            res.status(200).send({
                success: true,
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
            res.status(200).send({
                success: true,
                message: 'User logged out',
            });
        });
    })
);

export default commonRouter;