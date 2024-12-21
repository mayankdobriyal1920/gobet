import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {actionToLoginUserAndSendOtpApiCall, actionToVerifyLoginUserOtpApiCall} from "../models/commonModel.js";
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
                    responseToSend = {
                        success:1,
                    }
                    req.session.userSession = user;
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
    '/actionToGetCurrentUserSessionDataApiCall',
    expressAsyncHandler(async (req, res) => {
        let responseToSend = {success:0}
        if(req?.session?.userSession){
            responseToSend = {success:1}
        }
        res.status(200).send(responseToSend);
    })
);

export default commonRouter;