import pool from "./connection.js";
import {loginUserQuery} from "../queries/commonQuries.js";

export const actionToLoginUserAndSendOtpApiCall = (body) => {
    const {phone} = body;
    return new Promise(function(resolve, reject) {
        let found = null;
        let userData = {};
        userDummyDataArray?.forEach((users,key)=>{
            if(users.phone === phone){
                found = key;
            }
        })
        if(found !== null){
            userData = userDummyDataArray[found];
        }
        resolve(userData);

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
        let found = null;
        let userData = {};
        userDummyDataArray?.forEach((users,key)=>{
            if(users.phone === phone && users?.otp === Number(otp)){
                found = key;
            }
        })
        if(found !== null){
            userData = userDummyDataArray[found];
        }
        resolve(userData);


        const query = loginUserQuery();
        pool.query(query,[phone,otp], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })

    })
}