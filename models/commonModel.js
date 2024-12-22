import pool from "./connection.js";
import {loginUserQuery} from "../queries/commonQuries.js";

export const actionToLoginUserAndSendOtpApiCall = (body) => {
    const {phone} = body;
    return new Promise(function(resolve, reject) {
        // const query = loginUserQuery(password);
        // pool.query(query, (error, results) => {
        //     if (error) {
        //         reject(error)
        //     }
        //     resolve(results);
        // })
    })
}

export const actionToVerifyLoginUserOtpApiCall = (body) => {
    const {phone,otp} = body;
    return new Promise(function(resolve, reject) {
        let userData = {};
        const query = loginUserQuery();
        pool.query(query,[phone,otp], (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.rows?.length){
                userData = results?.rows[0];
            }
            resolve(userData);
        })
    })
}