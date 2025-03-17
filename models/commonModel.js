import pool from "./connection.js";
import crypto from 'crypto';
import {
    actionToGetNearestGameSessionOrActiveSessionAndGamePlatformQuery,
    checkMobNumberAlreadyExistQuery,
    getAdminPassCodeListQuery, getAliveUsersQuery,
    getDepositHistoryQuery,
    getGameHistoryQuery,
    getGameResultListQuery,
    getMoneyTransactionsQuery,
    getPendingDepositRequestListQuery,
    getPendingWithdrawalRequestListQuery,
    getUserByIdQuery,
    getWithdrawalHistoryQuery,
    isPassCodeValidQuery,
    loginUserQuery,
    signupQuery,
    updatePassCodeQuery,
    updateUserAvatarQuery,
    updateUserUserNameQuery,
} from "../queries/commonQuries.js";
import {
    _getRandomUniqueIdBackendServer,
    actionToDistributeBettingFunctionAmongUsers,
    actionToExecuteFunctionInLast10Seconds,
    bulkInsertCommonApiCall,
    deleteCommonApiCall,
    insertCommonApiCall,
    updateCommonApiCall
} from "./helpers/commonModelHelper.js";
import moment from "moment-timezone";

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
        const query = checkMobNumberAlreadyExistQuery();
        pool.query(query,[phone], (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                userData = results[0];
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
            if(results?.length){
                userData = results[0];
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
            if(results?.length){
                userData = results[0];
            }
            resolve(userData);
        })
    })
}

export const actionToGetNearestGameSessionOrActiveSessionAndGamePlatformApiCall = (body) => {
    const {game_type} = body;
    return new Promise(function(resolve, reject) {
        let resultData = {};
        const query = actionToGetNearestGameSessionOrActiveSessionAndGamePlatformQuery();
        pool.query(query,[game_type], (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                resultData = results[0];
            }
            resolve(resultData);
        })
    })
}

export const actionUpdatePassCodeApiCall = (body) => {
    const {passCodeId, newUserId} = body;
    return new Promise(function(resolve, reject) {
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
            if(results?.length){
                userData = results[0];
            }
            resolve(userData);
        })
    })
}

export const actionUpdateAvatarApiCall = (body) => {
    const {userId, avatar} = body;
    return new Promise(function(resolve, reject) {
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
            game_balance:0,
            betting_balance:0
        };
        const query = `SELECT wallet_balance,game_balance,betting_balance from app_user WHERE id = ?`;
        pool.query(query,[userId], (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                userData = results[0];
            }
            resolve(userData);
        })
    })
}

export const actionToGetBetActiveUserDataApiCall = (userId) => {
    return new Promise(function(resolve, reject) {
        const query = 'SELECT id from betting_active_users WHERE user_id = ?';
        let userData = {};
        pool.query(query,[userId], (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                userData = results[0];
            }
            resolve(userData);
        })
    })
}

export const actionToGetBetGameSessionDataApiCall = (sessionId) => {
    return new Promise(function(resolve, reject) {
        const query = 'SELECT * from betting_game_session WHERE id = ?';
        let userData = {};
        pool.query(query,[sessionId], (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                userData = results[0];
            }
            resolve(userData);
        })
    })
}

export const actionToGetGameLastResultDataApiCall = (sessionId) => {
    return new Promise(function(resolve, reject) {
        const query = 'SELECT id,result,game_id from game_result WHERE betting_game_session_id = ? AND result IS NULL ORDER BY game_id DESC LIMIT 1';
        let userData = {};
        pool.query(query,[sessionId], (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                userData = results[0];
            }
            resolve(userData);
        })
    })
}

export const actionToGetUserActiveSubscriptionDataApiCall = (userId) => {
    return new Promise(function(resolve, reject) {
        const query = `SELECT 
                            us.id,
                            s.name AS plan_name,
                            s.price,
                            s.duration_days,
                            us.plan_type,
                            us.total_value,
                            us.balance,
                            us.created_at,
                            us.expiry_date,
                            us.is_active
                        FROM user_subscriptions us
                        JOIN subscriptions s ON us.subscription_id = s.id
                        WHERE us.created_by = ? AND us.is_active = ?;
                        `;
        let userData = {};
        pool.query(query,[userId,1], (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                userData = results[0];
            }
            resolve(userData);
        })
    })
}

export const actionToGetAppSubscriptionPlanDataApiCall = () => {
    return new Promise(function(resolve, reject) {
        const query = `SELECT * FROM subscriptions;`;
        let userData = {};
        pool.query(query,[], (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                userData = results;
            }
            resolve(userData);
        })
    })
}

export const actionToGetCurrentUserProfileDataApiCall = (userId) => {
    return new Promise(function (resolve, reject) {
        let userData = {};
        const query = getUserByIdQuery();

        pool.query(query, [userId], (error, results) => {
            if (error) {
                reject(error);
            }

            if (results?.length) {
                userData = results[0];
                // Parse the JSON string in the `sub_admin` field
                // if (userData.sub_admin) {
                //     try {
                //         userData.sub_admin = JSON.parse(userData.sub_admin);
                //     } catch (parseError) {
                //         console.error("Error parsing sub_admin JSON:", parseError);
                //         // If parsing fails, keep the original string or set it to null
                //         userData.sub_admin = null;
                //     }
                // }
            }

            resolve(userData);
        });
    });
}

export const actionToGetPasscodeRequestBySubAdminApiCall = (userId) => {
    return new Promise(function(resolve, reject) {
        let userData = {};
        const query = `SELECT id from passcode_request WHERE user_id = ? AND status = ?`;
        pool.query(query,[userId,0], (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                userData = results[0];
            }
            resolve(userData);
        })
    })
}

export const actionToUpdateUserRoleApiCall = (body) => {
    const {userId,role} = body;
    return new Promise(function(resolve) {
        let setData = `role = ?`;
        const whereCondition = `id = ?`;
        let dataToSend = {column: setData, value: [role,userId], whereCondition: whereCondition, returnColumnName:'id',tableName: 'app_user'};
        updateCommonApiCall(dataToSend).then(()=>{
            resolve({status:1});
        })
    })
}
export const actionToGeneratePasscodeRequestBySubAdminApiCall = (userId,body) => {
    return new Promise(function(resolve, reject) {
        const {count} = body;
        const query = `SELECT id from passcode_request WHERE user_id = ? AND status = ?`;
        pool.query(query,[userId,0], (error, results) => {
            if (error) {
                reject(error)
            }
            if(!results?.length){
                ////////// UPDATE USER PERCENTAGE IN DB ////////////////
                let aliasArray = ['?','?'];
                let columnArray = ["user_id","count"];
                let valuesArray = [userId,count];
                let insertData = {alias: aliasArray, column: columnArray, values: valuesArray, tableName: 'passcode_request'};
                insertCommonApiCall(insertData).then(()=>{
                    resolve({status:1});
                })
                ////////// UPDATE USER PERCENTAGE IN DB ////////////////
            }
            resolve({status:0});
        })
    })
}

export const actionToApprovePasscodeRequestAndGeneratePasscodeApiCall = (adminUserId,body) => {
    return new Promise(function(resolve, reject) {
        const {id,user_id,count} = body;
        if (id) {
            let setData = `status = ?, updated_by = ?`;
            const whereCondition = `id = ?`;
            let dataToSend = {
                column: setData,
                value: [1, adminUserId, id],
                whereCondition: whereCondition,
                returnColumnName: 'id',
                tableName: 'passcode_request'
            };

            updateCommonApiCall(dataToSend).then(() => {
                let lengthLoop = count || 1; // Default to 1 if count is not provided
                let valuesArray = [];

                for (let i = 0; i < lengthLoop; i++) {
                    valuesArray.push([user_id, Math.floor(100000 + Math.random() * 900000), adminUserId]);
                }

                const insertData = {
                    column: ["user_id", "code", "created_by"],
                    valuesArray: valuesArray,
                    tableName: 'pass_code'
                };

                bulkInsertCommonApiCall(insertData).then(() => {
                    resolve({ status: 1 });
                }).catch((err) => {
                    console.error('Error during bulk insert:', err);
                    reject({ status: 0, error: err });
                });
            }).catch((err) => {
                console.error('Error during update:', err);
                reject({ status: 0, error: err });
            });
        } else {
            let lengthLoop = 5; // Default length loop to 5 if id is not provided
            let valuesArray = [];

            for (let i = 0; i < lengthLoop; i++) {
                valuesArray.push([adminUserId, Math.floor(100000 + Math.random() * 900000), adminUserId]);
            }

            const insertData = {
                column: ["user_id", "code", "created_by"],
                valuesArray: valuesArray,
                tableName: 'pass_code'
            };

            bulkInsertCommonApiCall(insertData).then(() => {
                resolve({ status: 1 });
            }).catch((err) => {
                console.error('Error during bulk insert:', err);
                reject({ status: 0, error: err });
            });
        }
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
                       LEFT JOIN bet_prediction_history bph ON bau.id = bph.betting_active_users_id AND bph.status = ? AND bph.game_type = ?
                       WHERE bau.id = ?`;
        pool.query(query,[1,'win_go',betting_active_users_id], (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                predData = {success:1,prediction:results[0]}
            }
            resolve(predData);
        })
    })
}

export const actionToActivateSubscriptionPlanApiCall = (userId,plan) => {
    return new Promise(function(resolve, reject) {
        if(!plan.id){
            resolve({status:false});
        }
        let query = `SELECT * from subscriptions WHERE id = ?`;
        pool.query(query, [plan.id], (error, results) => {
            if (error) {
                reject(error)
            }
            if (results?.length) {
                let subscription_id = results[0]?.id;
                let plan_type = results[0]?.name;
                let plan_price = Number(results[0]?.price);
                let total_value = results[0]?.value;
                let balance = results[0]?.value;
                let created_by = userId;
                let expiry_date = moment().add(30,'days').format();
                query = `SELECT wallet_balance from app_user WHERE id = ?`;
                pool.query(query, [userId], (error, results) => {
                    if (error) {
                        reject(error)
                    }
                    if (results?.length) {
                        let userWalletBalance = results[0]?.wallet_balance;

                        if (Number(plan_price) > Number(userWalletBalance)) {
                            resolve({status: 0, error: 'Given amount is greater then wallet balance'});
                        } else {
                            let aliasArray = ['?', '?', '?', '?', '?', '?'];
                            let columnArray = ["subscription_id", "plan_type", "total_value", "balance", "created_by","expiry_date"];
                            let valuesArray = [subscription_id, plan_type, total_value, balance,created_by,expiry_date];
                            let insertData = {
                                alias: aliasArray,
                                column: columnArray,
                                values: valuesArray,
                                tableName: 'user_subscriptions'
                            };
                            insertCommonApiCall(insertData).then(() => {
                                let setData = `wallet_balance = ?`;
                                const whereCondition = `id = ?`;
                                let dataToSend = {
                                    column: setData,
                                    value: [Number(userWalletBalance) - Number(plan_price), userId],
                                    whereCondition: whereCondition,
                                    returnColumnName: 'id',
                                    tableName: 'app_user'
                                };
                                updateCommonApiCall(dataToSend).then(() => {
                                    ////////// UPDATE USER PERCENTAGE IN DB ////////////////
                                    const user_transaction_history_id = `${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}`;
                                    let aliasArray = ['?', '?', '?', '?'];
                                    let columnArray = ["id", "amount", "user_id", "type"];
                                    let valuesArray = [user_transaction_history_id, plan_price, userId, 'purchased_subscription_plan'];
                                    let insertData = {
                                        alias: aliasArray,
                                        column: columnArray,
                                        values: valuesArray,
                                        tableName: 'user_transaction_history'
                                    };
                                    insertCommonApiCall(insertData).then(() => {
                                        resolve({status: 1});
                                    })
                                    ////////// UPDATE USER PERCENTAGE IN DB ////////////////
                                })
                            })

                        }
                    }
                })
            }else{
                resolve({status:false});
            }
        })
    })
}


export const actionToMakeCurrentUserInactiveApiCall = (betting_active_users_id) => {
    return new Promise(function(resolve) {
        let condition = `id = ? AND status != ? AND status != ?`;
        let tableName = "betting_active_users";
        deleteCommonApiCall({condition, tableName, values: [betting_active_users_id,1,2]}).then(() => {
            resolve({status:true});
        })
    })
}
export const actionToGetUserBetPredictionHistoryApiCall = (userId) => {
    return new Promise(function(resolve, reject) {
        let predData = [];
        const query = `SELECT *
                           FROM bet_prediction_history
                           WHERE user_id = ?
                           AND status = ?
                           AND game_type = ?
                           ORDER BY bet_prediction_history.bet_id desc
                           LIMIT 20`;
        pool.query(query,[userId,0,'win_go'], (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                predData = results;
            }
            resolve(predData);
        })
    })
}

export const actionToTransferAmountFromUserMainWalletToGameWalletApiCall = (userId,body) => {
    const {amount} = body;

    return new Promise(function(resolve, reject) {
        const query = `SELECT wallet_balance,betting_balance from app_user WHERE id = ?`;
        pool.query(query, [userId], (error, results) => {
            if (error) {
                reject(error)
            }
            if (results?.length) {
                let userWalletBalance = results[0]?.wallet_balance;

                if(Number(amount) > Number(userWalletBalance)){
                    resolve({status:0,error:'Given amount is greater then wallet balance'});
                }else{
                    let userBettingBalance = results[0]?.betting_balance;
                    let setData = `betting_balance = ?,wallet_balance = ?`;
                    const whereCondition = `id = ?`;
                    let dataToSend = {column: setData, value: [Number(userBettingBalance)+Number(amount),Number(userWalletBalance)-Number(amount),userId], whereCondition: whereCondition, returnColumnName:'id',tableName: 'app_user'};
                    updateCommonApiCall(dataToSend).then(()=>{
                        ////////// UPDATE USER PERCENTAGE IN DB ////////////////
                        const user_transaction_history_id = `${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}`;
                        let aliasArray = ['?','?','?','?'];
                        let columnArray = ["id","amount", "user_id","type"];
                        let valuesArray = [user_transaction_history_id,amount,userId,'wallet_to_betting_wallet_transfer'];
                        let insertData = {alias: aliasArray, column: columnArray, values: valuesArray, tableName: 'user_transaction_history'};
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

export const actionToGenerateWithdrawalRequestAndDeductAmountApiCall = (userId,body) => {
    const {amount} = body;
    return new Promise(function(resolve, reject) {
        const query = `SELECT wallet_balance,sub_admin from app_user WHERE id = ?`;
        pool.query(query, [userId], (error, results) => {
            if (error) {
                reject(error)
            }
            if (results?.length) {
                let userWalletBalance = results[0]?.wallet_balance;
                let userSubAdminId = results[0]?.sub_admin;

                if(Number(amount) > Number(userWalletBalance)){
                    resolve({status:0,error:'Given amount is greater then wallet balance'});
                }else{
                    let setData = `wallet_balance = ?`;
                    const whereCondition = `id = ?`;
                    let dataToSend = {column: setData, value: [Number(userWalletBalance)-Number(amount),userId], whereCondition: whereCondition, returnColumnName:'id',tableName: 'app_user'};
                    updateCommonApiCall(dataToSend).then(()=>{
                        ////////// UPDATE USER PERCENTAGE IN DB ////////////////
                        const withdrawal_history_id = `${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}`;
                        let aliasArray = ['?','?','?','?','?'];
                        let columnArray = ["id","amount", "user_id","sub_admin_id","status"];
                        let valuesArray = [withdrawal_history_id,amount,userId,userSubAdminId,0];
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
        const query = `SELECT * from deposit_history WHERE id = ?`;
        pool.query(query, [id], (error, results) => {
            if (error) {
                reject(error)
            }
            if (results?.length) {
                let userId = results[0]?.user_id;
                let userDepositAmount = results[0]?.amount;
                let setData = `wallet_balance = wallet_balance + ?`;
                let whereCondition = `id = ?`;
                let dataToSend = {column: setData, value: [userDepositAmount,userId], whereCondition: whereCondition, returnColumnName:'id',tableName: 'app_user'};
                updateCommonApiCall(dataToSend).then(()=>{
                    setData = `status = ?`;
                    whereCondition = `id = ?`;
                    dataToSend = {column: setData, value: [1,id], whereCondition: whereCondition, returnColumnName:'id',tableName: 'deposit_history'};
                    updateCommonApiCall(dataToSend).then(()=>{
                        resolve({status: 1});
                    })
                })
            }
        })
    })
}

export const actionToCompleteStatusOfWithdrawalRequestApiCall = (userId,body) => {
    const {id} = body;
    return new Promise(function(resolve) {
        let setData = `status = ?`;
        let whereCondition = `id = ?`;
        let dataToSend = {column: setData, value: [1,id], whereCondition: whereCondition, returnColumnName:'id',tableName: 'withdrawal_history'};
        updateCommonApiCall(dataToSend).then(()=>{
            resolve({status:1});
        })
    })
}
export const actionToGenerateDepositRequestApiCall = (userId,body) => {
    const {amount} = body;
    return new Promise(function(resolve, reject) {
        const query = `SELECT sub_admin from app_user WHERE id = ?`;
        pool.query(query, [userId], (error, results) => {
            if (error) {
                reject(error)
            }
            if (results?.length) {
                let userSubAdminId = results[0]?.sub_admin;
                ////////// UPDATE USER PERCENTAGE IN DB ////////////////
                const deposit_history_id = `${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}`;
                let aliasArray = ['?','?','?','?','?'];
                let columnArray = ["id","amount", "user_id","sub_admin_id","status"];
                let valuesArray = [deposit_history_id,amount,userId,userSubAdminId,0];
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
        let responseData = [];
        const {query,values} = getWithdrawalHistoryQuery(userId,payload);
        pool.query(query,values, (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                responseData = results;
            }
            resolve(responseData);
        })
    })
}

export const actionToGetDepositRequestHistoryDataApiCall = (userId,body) => {
    let {payload} = body;
    return new Promise(function(resolve, reject) {
        let responseData = [];
        const {query,values} = getDepositHistoryQuery(userId,payload);
        pool.query(query,values, (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                responseData = results;
            }
            resolve(responseData);
        })
    })
}

export const actionToGetGameHistoryDataApiCall = (userId,body) => {
    let {payload} = body;
    return new Promise(function(resolve, reject) {
        let responseData = [];
        const {query,values} = getGameHistoryQuery(userId,payload);
        pool.query(query,values, (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                responseData = results;
            }
            resolve(responseData);
        })
    })
}

export const actionToGetMoneyTransactionDataApiCall = (userId,body) => {
    let {payload} = body;
    return new Promise(function(resolve, reject) {
        let responseData = [];
        const {query,values} = getMoneyTransactionsQuery(userId,payload);
        pool.query(query,values, (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                responseData = results;
            }
            resolve(responseData);
        })
    })
}

export const actionToGetAdminGameResultListDataApiCall = (userId,body) => {
    let {payload} = body;
    return new Promise(function(resolve, reject) {
        let responseData = [];
        const {query,values} = getGameResultListQuery(userId,payload);
        pool.query(query,values, (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                responseData = results;
            }
            resolve(responseData);
        })
    })
}

export const actionToGetPendingWithdrawalRequestListDataApiCall = (userId,body) => {
    let {payload} = body;
    return new Promise(function(resolve, reject) {
        let responseData = [];
        const {query,values} = getPendingWithdrawalRequestListQuery(userId,payload);
        pool.query(query,values, (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                responseData = results;
            }
            resolve(responseData);
        })
    })
}
export const actionToGetPendingDepositRequestListDataApiCall = (userId,body) => {
    let {payload} = body;
    return new Promise(function(resolve, reject) {
        let responseData = [];
        const {query,values} = getPendingDepositRequestListQuery(userId,payload);
        pool.query(query,values, (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                responseData = results;
            }
            resolve(responseData);
        })
    })
}

export const actionToGetAdminUserPasscodeListDataListApiCall = (userId,body) => {
    let {payload} = body;
    return new Promise(function(resolve, reject) {
        let responseData = [];
        const {query,values} = getAdminPassCodeListQuery(userId,payload);
        pool.query(query,values, (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                responseData = results;
            }
            resolve(responseData);
        })
    })
}

export const actionToGetAllUsersUnderSubAdminListApiCall = (userId) => {
    return new Promise(function(resolve, reject) {
        let responseData = [];
        const query = `SELECT id,name,phone_number,created_at,wallet_balance from app_user WHERE sub_admin = ?`;
        pool.query(query,[userId], (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                responseData = results;
            }
            resolve(responseData);
        })
    })
}

export const actionToGetAllUsersNormalAndSubAdminListApiCall = (userId, body) => {
    let {payload} = body;
    let { type } = payload;
    return new Promise(function(resolve, reject) {
        let responseData = [];
        let condition = ``;
        // Add condition for type if provided
        if (type && type !== 'All') {
            condition += ` AND app_user.role = ${type}`;  // Add 'type' condition
        }

        const query = `SELECT app_user.id,app_user.name,app_user.phone_number,app_user.created_at,app_user.wallet_balance,app_user.game_balance,app_user.role,sub_admin_user.name as sub_admin_name from app_user 
                               LEFT JOIN app_user as sub_admin_user ON sub_admin_user.id = app_user.id                                                             
                               WHERE app_user.id != ? ${condition} ORDER BY app_user.id desc`;
        pool.query(query,[userId], (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                responseData = results;
            }
            resolve(responseData);
        })
    })
}

export const actionToCallFunctionToUpdateGameResultApiCall = (userId, body) => {
    const { id, result } = body;

    return new Promise((resolve, reject) => {
        // Step 1: Update the `game_result` table with the provided result
        const updateGameResult = () => {
            const setData = `result = ?, updated_by = ?`;
            const whereCondition = `id = ?`;
            const dataToSend = {
                column: setData,
                value: [result, userId, id],
                whereCondition: whereCondition,
                returnColumnName: 'id',
                tableName: 'game_result',
            };

            return updateCommonApiCall(dataToSend);
        };

        // Step 2: Fetch users who lost the bet (those whose option_name != result)
        const fetchAllUsersBets = () => {
            const query = `SELECT user_id, amount,option_name
                            FROM bet_prediction_history 
                            WHERE game_result_id = ?`;

            return new Promise((resolve, reject) => {
                pool.query(query, [id], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
        };

        // Step 3: Update wallet balances for users who lost the bet
        const updateWalletBalances = (allUsersBets) => {
            const updatePromises = allUsersBets.map((allBetData) => {
                let setData = ``;
                let whereCondition = ``;
                let dataToSend = {};
                let userTrnsectionType = '';
                let amountToDeduct = 0;

                if(allBetData?.option_name !== result) {
                    // Update user's game balance
                    setData = `game_balance = game_balance + ?`;
                    whereCondition = `id = ?`;
                    dataToSend = {
                        column: setData,
                        value: [Number(allBetData.amount * 2) - (0.02 * Number(allBetData.amount)), allBetData.user_id],
                        whereCondition: whereCondition,
                        returnColumnName: 'id',
                        tableName: 'app_user',
                    };
                    userTrnsectionType = 'game_loose_amount_credit';
                    amountToDeduct = Number(allBetData.amount * 2) - (0.02 * Number(allBetData.amount));
                }else{
                    // Update user's game balance
                    setData = `game_balance = game_balance + ?`;
                    whereCondition = `id = ?`;
                    dataToSend = {
                        column: setData,
                        value: [(0.02 * Number(allBetData.amount)), allBetData.user_id],
                        whereCondition: whereCondition,
                        returnColumnName: 'id',
                        tableName: 'app_user',
                    };
                    userTrnsectionType = 'game_win_amount_credit';
                    amountToDeduct = (0.02 * Number(allBetData.amount));
                }

                // Insert transaction history
                const user_transaction_history_id = `${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}`;
                const aliasArray = ['?', '?', '?', '?'];
                const columnArray = ['id', 'amount', 'user_id', 'type'];
                const valuesArray = [user_transaction_history_id, amountToDeduct, allBetData.user_id, userTrnsectionType];
                const insertData = {
                    alias: aliasArray,
                    column: columnArray,
                    values: valuesArray,
                    tableName: 'user_transaction_history',
                };

                return Promise.all([
                    updateCommonApiCall(dataToSend),
                    insertCommonApiCall(insertData),
                ]);
            });

            return Promise.all(updatePromises);
        };

        // Step 4: Update win_status for all bets related to the game_result_id
        const updateWinStatus = () => {
            const setData = `win_status = CASE 
                              WHEN option_name = ? THEN 1 
                              ELSE 0 
                              END`;
            const whereCondition = `game_result_id = ?`;
            const dataToSend = {
                column: setData,
                value: [result, id],
                whereCondition: whereCondition,
                returnColumnName: 'id',
                tableName: 'bet_prediction_history',
            };

            return updateCommonApiCall(dataToSend);
        };

        // Execute the steps in sequence
        updateGameResult()
            .then(() => fetchAllUsersBets())
            .then((allUsersBets) => {
                if (allUsersBets.length > 0) {
                    return updateWalletBalances(allUsersBets);
                } else {
                    return Promise.resolve(); // No losing bets, skip wallet updates
                }
            })
            .then(() => updateWinStatus())
            .then(() => resolve({ status: 1 })) // Resolve after all updates are complete
            .catch((error) => reject(error)); // Handle any errors
    });
};

export const actionToOrderNextBetActivateUserApiCall = (betId, userId) => {
    return new Promise(function (resolve, reject) {
        const queryUserBalance = `SELECT betting_balance FROM app_user WHERE id = ?`;

        pool.query(queryUserBalance, [userId], (error, results) => {
            if (error) {
                return reject(error);
            }

            if (results?.length) {
                let userBettingBalance = results[0]?.betting_balance;

                const querySubscription = `SELECT expiry_date, balance FROM user_subscriptions WHERE created_by = ?`;

                pool.query(querySubscription, [userId], (error, subResults) => {
                    if (error) {
                        return reject(error);
                    }

                    if (subResults?.length) {
                        let subExpiryDate = new Date(subResults[0]?.expiry_date);
                        let subBalance = subResults[0]?.balance;
                        let currentDate = new Date();

                        // Check conditions
                        if (subExpiryDate < currentDate) {
                            return reject({ success: 0, message: "Subscription expired." });
                        }
                        if (subBalance < 10) {
                            return reject({ success: 0, message: "Insufficient subscription balance." });
                        }
                        if (userBettingBalance < 10) {
                            return reject({ success: 0, message: "Insufficient betting balance." });
                        }

                        // Update status if all conditions are met
                        let setData = `status = ?`;
                        const whereCondition = `id = ?`;
                        let dataToSend = {
                            column: setData,
                            value: [1, betId],
                            whereCondition: whereCondition,
                            returnColumnName: 'id',
                            tableName: 'betting_active_users'
                        };

                        updateCommonApiCall(dataToSend)
                            .then(() => {
                                resolve({ success: 1 });
                            })
                            .catch((err) => reject(err));
                    } else {
                        reject({ success: 0, message: "No subscription found." });
                    }
                });
            } else {
                reject({ success: 0, message: "User not found." });
            }
        });
    });
};


export const actionToCancelNextBetOrderActivateUserApiCall = (betId) => {
    return new Promise(function(resolve) {
        let setData = `status = ?`;
        const whereCondition = `id = ?`;
        let dataToSend = {column: setData, value: [3,betId], whereCondition: whereCondition, returnColumnName:'id',tableName: 'betting_active_users'};
        updateCommonApiCall(dataToSend).then(()=>{
            resolve({success:1});
        })
    })
}

export const actionToCallFunctionToActiveSectionAndStartGameApiCall = (userId,sessionId) => {
    return new Promise(function(resolve) {
        let setData = `started_by = ? , is_active = ?`;
        const whereCondition = `id = ?`;
        let dataToSend = {
            column: setData,
            value: [userId, 1, sessionId],
            whereCondition: whereCondition,
            returnColumnName: 'id',
            tableName: 'betting_game_session'
        };
        updateCommonApiCall(dataToSend).then(() => {
            resolve({success: 1});
        })
    })
}
export const actionToUpdateUserAliveForGameApiCall = (userId,sessionId,platformId) => {
    return new Promise(function(resolve) {
        const query = 'SELECT id from betting_active_users WHERE user_id = ?';
        pool.query(query,[userId], (error, results) => {
            if(results?.length){
                let setData = `status = ? , betting_game_session_id = ? , betting_platform_id = ?`;
                const whereCondition = `id = ? AND status != ? AND status != ?`;
                let dataToSend = {column: setData, value: [3,sessionId,platformId,results[0]?.id,2,1], whereCondition: whereCondition, returnColumnName:'id',tableName: 'betting_active_users'};
                updateCommonApiCall(dataToSend).then(()=>{
                    resolve({success:1,betting_active_users_id:results[0]?.id});
                })
            }else{
                let getRandomAliveUserId = `${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}`;
                let aliasArray = ['?','?','?'];
                let columnArray = ["id","user_id", "status"];
                let valuesArray = [getRandomAliveUserId,userId,3];
                let insertData = {alias: aliasArray, column: columnArray, values: valuesArray, tableName: 'betting_active_users'};
                insertCommonApiCall(insertData).then(()=>{
                    resolve({success:1,betting_active_users_id:getRandomAliveUserId});
                })
            }
        })
    })

}


export const actionGetUserByIdApiCall = (userId) => {
    return new Promise(function (resolve, reject) {
        let userData = {};
        const query = getUserByIdQuery();

        pool.query(query, [userId], (error, results) => {
            if (error) {
                reject(error);
            }

            if (results?.length) {
                userData = results[0];
                // Parse the JSON string in the `sub_admin` field
                // if (userData.sub_admin) {
                //     try {
                //         userData.sub_admin = JSON.parse(userData.sub_admin);
                //     } catch (parseError) {
                //         console.error("Error parsing sub_admin JSON:", parseError);
                //         // If parsing fails, keep the original string or set it to null
                //         userData.sub_admin = null;
                //     }
                // }
            }

            resolve(userData);
        });
    });
};

export const actionTransferMoneyToMainWalletApiCall = (userId) => {
    return new Promise(function(resolve, reject) {
        const query = `SELECT wallet_balance,game_balance,betting_balance from app_user WHERE id = ?`;
        pool.query(query, [userId], (error, results) => {
            if (error) {
                reject(error)
            }
            if (results?.length) {
                let userGameBalance = results[0]?.game_balance;
                let userWalletBalance = results[0]?.wallet_balance;
                let userBettingBalance = results[0]?.betting_balance;

                if(Number(userGameBalance) < 1 && Number(userBettingBalance) < 1){
                    resolve({status:0,error:'Game wallet does not has any balance'});
                }else{
                    let userNewWalletBalance = Number(userWalletBalance) + Number(userGameBalance) + Number(userBettingBalance);
                    let setData = `game_balance = ?,betting_balance = ?,wallet_balance = ?`;
                    const whereCondition = `id = ?`;
                    let dataToSend = {column: setData, value: [0,0, userNewWalletBalance,userId], whereCondition: whereCondition, returnColumnName:'id',tableName: 'app_user'};
                    updateCommonApiCall(dataToSend).then(()=>{
                        resolve({status:1});
                    })
                }
            }
        })
    })
}




export function actionToSetAllCronJobsToBettingSlot() {
    actionToExecuteFunctionInLast10Seconds();
}
export function actionToRunCheckForAliveUsers(sessionId) {
    try {
        pool.query(getAliveUsersQuery(), [1], (error, results) => {
            if (error) {
                console.error('Database Query Error:', error);
                return;
            }
            if (results?.length > 1) {
                const filteredUsers = results
                    .filter(user => user.is_test_user === 1 || user.subscription_id) // Remove test users & users without a subscription
                    .map(user => ({
                        ...user,
                        balance: Math.min(user.subscription_balance, user.balance) // Update betting_balance
                    }));

                if (filteredUsers.length > 1) {
                    const hasRealUser = results.some(user => user.is_test_user === 0);
                    if (hasRealUser) {
                        actionToDistributeBettingFunctionAmongUsers(filteredUsers, sessionId);
                        return;
                    }
                }
            }

            let setData = `status = ?`;
            const whereCondition = `is_test_user = ?`;
            let dataToSend = {column: setData, value: [3,0], whereCondition: whereCondition, returnColumnName:'id',tableName: 'betting_active_users'};
            updateCommonApiCall(dataToSend).then(()=>{})
        });
    } catch (error) {
        console.error('Error:', error);
    }
}