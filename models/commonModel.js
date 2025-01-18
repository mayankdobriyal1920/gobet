import pool from "./connection.js";
import crypto from 'crypto';
import {
    CheckMobNumberAlreadyExistQuery, getUserByIdQuery, getWithdrawalHistoryQuery,
    isPassCodeValidQuery,
    loginUserQuery,
    signupQuery, updatePassCodeQuery, updateUserAvatarQuery, updateUserUserNameQuery, userProfileDataQuery
} from "../queries/commonQuries.js";
import {
    actionToGetAliveUserAndStartTimerOnIt,
    insertCommonApiCall,
    updateCommonApiCall
} from "./helpers/commonModelHelper.js";

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

export const actionToSendOtpApiCall = (body) => {
    const {phone} = body;
    return new Promise(function(resolve, reject) {
        let userData = {};
        const query = CheckMobNumberAlreadyExistQuery();
        pool.query(query,[phone], (error, results) => {
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

export const actionSignupApiCall = (body) => {
    const {phone, userId} = body;
    return new Promise(function(resolve, reject) {
        let userData = {};
        const query = signupQuery();
        const currentDateTime = new Date().toISOString();
        const numericPart = Math.floor(Math.random() * 1000000);  // Numeric part: Generates a random number (e.g., 435324)
        const length = 8;
        const stringPart1 = crypto.randomBytes(length).toString('hex').slice(0, length);               // Alphanumeric part 1 (e.g., rtthyfgh)
        const stringPart2 = crypto.randomBytes(length).toString('hex').slice(0, length);               // Alphanumeric part 2 (e.g., ljkhersf)
        const userIdVal = `${numericPart}-${stringPart1}-${stringPart2}`;
        const dataArray = [userIdVal, 'krishna', phone, 'avatar-3', userId, 0, 3, currentDateTime];
        pool.query(query,dataArray, (error, results) => {
            if (error) {
                console.log(error)
                reject(error)
            }
            if(results?.rows?.length){
                userData = results?.rows[0];
            }
            resolve(userData);
        })
    })
}

export const actionValidatePassCodeApiCall = (body) => {
    const passcode = body;
    return new Promise(function(resolve, reject) {
        let userData = {};
        const query = isPassCodeValidQuery();
        pool.query(query,[passcode], (error, results) => {
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

export const actionUpdatePassCodeApiCall = (body) => {
    const {passCodeId, newUserId} = body;
    return new Promise(function(resolve, reject) {
        let userData = {};
        const query = updatePassCodeQuery();
        pool.query(query,[newUserId, passCodeId], (error, results) => {
            if (error) {
                console.log(error);
                reject(error)
            }
            let responseToSend = {
                status:'failed'
            }
            if(results){
                responseToSend = {
                    status:'success'
                }
            }
            resolve(responseToSend);
        })
    })
}

export const actionToVerifyLoginUserOtpApiCall = (body) => {
    const phone = body;
    return new Promise(function(resolve, reject) {
        let userData = {};
        const query = loginUserQuery();
        pool.query(query,[phone], (error, results) => {
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

export const actionUpdateAvatarApiCall = (body) => {
    const {userId, avatar} = body;
    return new Promise(function(resolve, reject) {
        let userData = {};
        const query = updateUserAvatarQuery();
        pool.query(query,[avatar, userId], (error, results) => {
            if (error) {
                console.log(error);
                reject(error)
            }
            let responseToSend = {
                status:'failed'
            }
            if(results){
                responseToSend = {
                    status:'success'
                }
            }
            resolve(responseToSend);
        })
    })
}

export const actionUpdateUserNameApiCall = (name, userId) => {
    return new Promise(function(resolve, reject) {
        let userData = {};
        const query = updateUserUserNameQuery();
        pool.query(query,[name, userId], (error, results) => {
            if (error) {
                console.log(error);
                reject(error)
            }
            let responseToSend = {
                status:'failed'
            }
            if(results){
                responseToSend = {
                    status:'success'
                }
            }
            resolve(responseToSend);
        })
    })
}

export const actionToGetUserWalletAndGameBalanceApiCall = (userId) => {
    return new Promise(function(resolve, reject) {
        let userData = {
            wallet_balance:0,
            game_balance:0
        };
        const query = `SELECT wallet_balance,game_balance from app_user WHERE id = $1`;
        pool.query(query,[userId], (error, results) => {
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

export const actionToGetCurrentUserProfileDataApiCall = (userId) => {
    return new Promise(function(resolve, reject) {
        let userData = {};
        const query = userProfileDataQuery();
        pool.query(query,[userId], (error, results) => {
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

export const actionToGetUserBetPredictionDataApiCall = (userId,betting_active_users_id) => {
    return new Promise(function(resolve, reject) {
        let predData = {success:5};
        const query = `SELECT
                           bph.id AS id,
                           bau.status AS status,
                           bph.amount AS amount,
                           bph.bet_id AS bet_id,
                           bph.created_at AS created_at,
                           bph.option_name AS option_name,
                           bph.min AS min
                       FROM betting_active_users bau
                       LEFT JOIN bet_prediction_history bph ON bau.id = bph.betting_active_users_id AND bph.status = $2 AND bph.game_type = $3
                       WHERE bau.id = $1`;
        pool.query(query,[betting_active_users_id,1,'win_go'], (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.rows?.length){
                predData = {success:1,prediction:results?.rows[0]}
            }
            resolve(predData);
        })
    })
}


export const actionToGetUserBetPredictionHistoryApiCall = (userId) => {
    return new Promise(function(resolve, reject) {
        let predData = [];
        const query = `SELECT * from bet_prediction_history WHERE user_id = $1 AND status = $2 AND game_type = $3`;
        pool.query(query,[userId,0,'win_go'], (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.rows?.length){
                predData = results?.rows;
            }
            resolve(predData);
        })
    })
}

export const actionToTransferAmountFromUserMainWalletToGameWalletApiCall = (userId,body) => {
    const {amount} = body;
    return new Promise(function(resolve, reject) {
        const query = `SELECT wallet_balance,game_balance from app_user WHERE id = $1`;
        pool.query(query, [userId], (error, results) => {
            if (error) {
                reject(error)
            }
            if (results?.rows?.length) {
                let userWalletBalance = results?.rows[0]?.wallet_balance;

                if(Number(amount) > Number(userWalletBalance)){
                    resolve({status:0,error:'Given amount is greater then wallet balance'});
                }else{
                    ///////// GAME 1% TRANSFER TO GAME WALLET //////////////
                    let userGameBalance = results?.rows[0]?.game_balance;
                    let percentageOfGame = Math.round(amount / 100);
                    let userTotalGameBalance = amount - percentageOfGame;
                    ///////// GAME 1% TRANSFER TO GAME WALLET //////////////
                    let setData = `game_balance = $1,wallet_balance = $2`;
                    const whereCondition = `id = '${userId}'`;
                    let dataToSend = {column: setData, value: [Number(userGameBalance)+Number(userTotalGameBalance),Number(userWalletBalance)-Number(amount)], whereCondition: whereCondition, returnColumnName:'id',tableName: 'app_user'};
                    updateCommonApiCall(dataToSend).then(()=>{
                        ////////// UPDATE USER PERCENTAGE IN DB ////////////////
                        let aliasArray = ['$1','$2','$3'];
                        let columnArray = ["amount", "user_id","type"];
                        let valuesArray = [amount,userId,'wallet_to_game_wallet_transfer'];
                        let insertData = {alias: aliasArray, column: columnArray, values: valuesArray, tableName: 'user_transaction_history'};
                        insertCommonApiCall(insertData).then(()=>{
                            ////////// UPDATE USER PERCENTAGE IN DB ////////////////
                            aliasArray = ['$1','$2'];
                            columnArray = ["amount", "user_id"];
                            valuesArray = [percentageOfGame,userId];
                            insertData = {alias: aliasArray, column: columnArray, values: valuesArray, tableName: 'betting_percentage'};
                            insertCommonApiCall(insertData).then(()=>{
                                aliasArray = ['$1','$2','$3'];
                                columnArray = ["amount", "user_id","type"];
                                valuesArray = [percentageOfGame,userId,'game_percentage_deduct'];
                                insertData = {alias: aliasArray, column: columnArray, values: valuesArray, tableName: 'user_transaction_history'};
                                insertCommonApiCall(insertData).then(()=>{
                                    resolve({status:1});
                                })
                            })
                            ////////// UPDATE USER PERCENTAGE IN DB ////////////////
                        })
                        ////////// UPDATE USER PERCENTAGE IN DB ////////////////
                    })
                }
            }
        })
    })
}


export const actionToGenerateWithdrawalRequestAndDeductAmountApiCall = (userId,body) => {
    const {amount} = body;
    return new Promise(function(resolve, reject) {
        const query = `SELECT wallet_balance,sub_admin from app_user WHERE id = $1`;
        pool.query(query, [userId], (error, results) => {
            if (error) {
                reject(error)
            }
            if (results?.rows?.length) {
                let userWalletBalance = results?.rows[0]?.wallet_balance;
                let userSubAdminId = results?.rows[0]?.sub_admin;

                if(Number(amount) > Number(userWalletBalance)){
                    resolve({status:0,error:'Given amount is greater then wallet balance'});
                }else{
                    let setData = `wallet_balance = $1`;
                    const whereCondition = `id = '${userId}'`;
                    let dataToSend = {column: setData, value: [Number(userWalletBalance)-Number(amount)], whereCondition: whereCondition, returnColumnName:'id',tableName: 'app_user'};
                    updateCommonApiCall(dataToSend).then(()=>{
                        ////////// UPDATE USER PERCENTAGE IN DB ////////////////
                        let aliasArray = ['$1','$2','$3','$4'];
                        let columnArray = ["amount", "user_id","sub_admin_id","status"];
                        let valuesArray = [amount,userId,userSubAdminId,0];
                        let insertData = {alias: aliasArray, column: columnArray, values: valuesArray, tableName: 'withdrawal_history'};
                        insertCommonApiCall(insertData).then(()=>{
                            resolve({status:1});
                        })
                        ////////// UPDATE USER PERCENTAGE IN DB ////////////////
                    })
                }
            }
        })
    })
}

export const actionToCompleteStatusOfDepositRequestApiCall = (userId,body) => {
    const {id} = body;
    return new Promise(function(resolve, reject) {
        const query = `SELECT * from deposit_history WHERE id = $1`;
        pool.query(query, [id], (error, results) => {
            if (error) {
                reject(error)
            }
            if (results?.rows?.length) {
                let userId = results?.rows[0]?.user_id;
                let userDepositAmount = results?.rows[0]?.amount;
                let setData = `wallet_balance = wallet_balance + $1`;
                let whereCondition = `id = $2`;
                let dataToSend = {column: setData, value: [userDepositAmount,userId], whereCondition: whereCondition, returnColumnName:'id',tableName: 'app_user'};
                updateCommonApiCall(dataToSend).then(()=>{
                    setData = `status = $1`;
                    whereCondition = `id = $2`;
                    dataToSend = {column: setData, value: [1,id], whereCondition: whereCondition, returnColumnName:'id',tableName: 'deposit_history'};
                    updateCommonApiCall(dataToSend).then(()=>{
                        resolve({status:1});
                    })
                })
            }
        })
    })
}

export const actionToCompleteStatusOfWithdrawalRequestApiCall = (userId,body) => {
    const {id} = body;
    return new Promise(function(resolve) {
        let setData = `status = $1`;
        let whereCondition = `id = $2`;
        let dataToSend = {column: setData, value: [1,id], whereCondition: whereCondition, returnColumnName:'id',tableName: 'withdrawal_history'};
        updateCommonApiCall(dataToSend).then(()=>{
            resolve({status:1});
        })
    })
}
export const actionToGenerateDepositRequestApiCall = (userId,body) => {
    const {amount} = body;
    return new Promise(function(resolve, reject) {
        const query = `SELECT sub_admin from app_user WHERE id = $1`;
        pool.query(query, [userId], (error, results) => {
            if (error) {
                reject(error)
            }
            if (results?.rows?.length) {
                let userSubAdminId = results?.rows[0]?.sub_admin;

                ////////// UPDATE USER PERCENTAGE IN DB ////////////////
                let aliasArray = ['$1','$2','$3','$4'];
                let columnArray = ["amount", "user_id","sub_admin_id","status"];
                let valuesArray = [amount,userId,userSubAdminId,0];
                let insertData = {alias: aliasArray, column: columnArray, values: valuesArray, tableName: 'deposit_history'};
                insertCommonApiCall(insertData).then(()=>{
                    resolve({status:1});
                })
                ////////// UPDATE USER PERCENTAGE IN DB ////////////////
            }
        })
    })
}

export const actionToGetWithdrawalRequestHistoryDataApiCall = (userId,body) => {
    let {payload} = body;
    return new Promise(function(resolve, reject) {
        let userData = {};
        const {query,values} = getWithdrawalHistoryQuery(userId,payload);
        pool.query(query,values, (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.rows?.length){
                userData = results?.rows;
            }
            resolve(userData);
        })
    })
}
export const actionToUpdateUserAliveForGameApiCall = (userId) => {
    return new Promise(function(resolve) {
        const query = 'SELECT id from betting_active_users WHERE user_id = $1 AND status = $2';
        pool.query(query,[userId,2], (error, results) => {
            if(results?.rows?.length){
                resolve({success:1,betting_active_users_id:results?.rows[0]?.id});
            }else{
                let aliasArray = ['$1','$2'];
                let columnArray = ["user_id", "status"];
                let valuesArray = [userId,2]; // 3 = WAIT
                let insertData = {alias: aliasArray, column: columnArray, values: valuesArray, tableName: 'betting_active_users'};
                insertCommonApiCall(insertData).then((id)=>{
                    ///////// BETTING DISTRIBUTION FUNCTION ////////
                    actionToGetAliveUserAndStartTimerOnIt(userId);
                    ///////// BETTING DISTRIBUTION FUNCTION ////////
                    resolve({success:1,betting_active_users_id:id});
                })
            }
        })
    })
}


export const actionGetUserByIdApiCall = (body) => {
    const userId = body;
    return new Promise(function(resolve, reject) {
        let userData = {};
        const query = getUserByIdQuery();
        pool.query(query,[userId], (error, results) => {
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

export const actionTransferMoneyToMainWalletApiCall = (userId) => {
    return new Promise(function(resolve, reject) {
        const query = `SELECT wallet_balance,game_balance from app_user WHERE id = $1`;
        pool.query(query, [userId], (error, results) => {
            if (error) {
                reject(error)
            }
            if (results?.rows?.length) {
                let userGameBalance = results?.rows[0]?.game_balance;
                let userWalletBalance = results?.rows[0]?.wallet_balance;

                if(Number(userGameBalance) < 1){
                    resolve({status:0,error:'Game wallet does not has any balance'});
                }else{
                    let userNewWalletBalance = Number(userWalletBalance) + Number(userGameBalance);
                    ///////// GAME 1% TRANSFER TO GAME WALLET //////////////
                    let setData = `game_balance = $1,wallet_balance = $2`;
                    const whereCondition = `id = '${userId}'`;
                    let dataToSend = {column: setData, value: [0, userNewWalletBalance], whereCondition: whereCondition, returnColumnName:'id',tableName: 'app_user'};
                    updateCommonApiCall(dataToSend).then(()=>{
                        resolve({status:1});
                    })
                }
            }
        })
    })
}