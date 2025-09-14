import pool from "./connection.js";
import crypto from 'crypto';
import {
    actionToGetAllUsersSubscriptionsDataQuery,
    actionToGetGameSessionOrAllSessionAndGamePlatformQuery, actionToGetNearestGameSessionBasedOnGameTypeQuery,
    actionToGetNearestGameSessionOrActiveSessionAndGamePlatformQuery, actionToGetOrderStatusListDataQuery,
    checkMobNumberAlreadyExistQuery,
    getAdminPassCodeListQuery, getAliveUsersQuery,
    getDepositHistoryQuery,
    getGameHistoryQuery, GetGamePredictionHistoryDataQuery,
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
    const {phone,name,role, userId} = body;
    return new Promise(function(resolve, reject) {
        const query = signupQuery();
        const numericPart = Math.floor(Math.random() * 1000000);
        const length = 8;
        const stringPart1 = crypto.randomBytes(length).toString('hex').slice(0, length);
        const stringPart2 = crypto.randomBytes(length).toString('hex').slice(0, length);
        const userIdVal = `${numericPart}-${stringPart1}-${stringPart2}`;
        const dataArray = [userIdVal,name,phone,'avatar-3',userId,0,role];
        pool.query(query,dataArray, (error) => {
            if (error) {
                reject(error)
            }
            actionToGetCurrentUserProfileDataApiCall(userIdVal).then((userData)=>{
                resolve(userData);
            })
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

export const actionToGetNearestGameSessionBasedOnGameTypeApiCall = (body) => {
    const {game_type} = body;
    return new Promise(function(resolve, reject){
        let resultData = {};
        const query = actionToGetNearestGameSessionBasedOnGameTypeQuery();
        pool.query(query, [], (error, results) =>{
            if(error) reject(error);
            if(results.length){
                resultData = results[0];
            }
            resolve(resultData);
        })
    })
}

export const actionToGetGameSessionOrAllSessionAndGamePlatformApiCall = () => {
    return new Promise(function(resolve, reject) {
        let resultData = [];
        const query = actionToGetGameSessionOrAllSessionAndGamePlatformQuery();
        pool.query(query,[], (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                resultData = results;
            }
            resolve(resultData);
        })
    })

}
export const actionToInsertGameSessionDataApiCall = async (userId, body) => {
    const { currentSessionId, newSessionSerialNumber, sessionNumber, start_time, is_active, game_type, betting_platform_id } = body;

    // deactivate old
    let dataToSend = {
        column: `is_active = ?`,
        value: [0, currentSessionId],
        whereCondition: `id = ?`,
        returnColumnName: "id",
        tableName: "betting_game_session",
    };

    await updateCommonApiCall(dataToSend);

    // insert new
    let insertData = {
        alias: ["?", "?", "?", "?", "?", "?", "?","?"],
        column: [
            "start_time",
            "betting_platform_id",
            "game_type",
            "created_by",
            "serial_number",
            "session_number",
            "is_active",
            "started_by"
        ],
        values: [
            start_time,
            betting_platform_id,
            game_type,
            userId,
            newSessionSerialNumber,
            sessionNumber,
            is_active,
            userId
        ],
        tableName: "betting_game_session",
    };

    const insertResult = await insertCommonApiCall(insertData);
    // Adjust based on your DB helper response
    const newId = insertResult?.insertId || null;

    return { status: 1, newSessionId: newId };
};

export const actionToSaveGameSessionDataApiCall = (userId, body) => {
    const { id, start_time, end_time, betting_platform_id, game_type } = body;

    return new Promise((resolve) => {
        const values = [
            start_time, start_time,  // Case 1: Overlapping start time
            end_time, end_time,      // Case 2: Overlapping end time
            start_time, end_time,    // Case 3: New session inside old session
            start_time, end_time     // Case 4: Old session inside new session
        ];

        let condition = "";
        if (id) {
            condition = " AND id != ?";
            values.push(id);
        }

        const query = `
            SELECT id FROM betting_game_session
            WHERE game_type = ?
              AND (
                (start_time <= ? AND end_time >= ?) OR  -- Case 1
                (start_time <= ? AND end_time >= ?) OR  -- Case 2
                (start_time >= ? AND end_time <= ?) OR  -- Case 3
                (? <= start_time AND ? >= end_time)     -- Case 4
                ) ${condition}`;

        console.log("Executing Query:", query);
        console.log("With Values:", [game_type, ...values]);

        pool.query(query, [game_type, ...values], (error, results) => {
            if (error) {
                console.error("Database Query Error:", error);
                resolve({ status: 0, message: "Database error" });
                return;
            }

            console.log("Query Results:", results);
            console.log("Results Length:", results?.length);

            if (!results?.length) {
                if (!id) {
                    let insertData = {
                        alias: ["?", "?", "?", "?", "?"],
                        column: ["start_time", "end_time", "betting_platform_id", "game_type", "created_by"],
                        values: [start_time, end_time, betting_platform_id, game_type, userId],
                        tableName: "betting_game_session",
                    };

                    insertCommonApiCall(insertData).then(() => {
                        resolve({ status: 1 });
                    });
                } else {
                    let dataToSend = {
                        column: `start_time = ?, end_time = ?, betting_platform_id = ?, game_type = ?`,
                        value: [start_time, end_time, betting_platform_id, game_type, id],
                        whereCondition: `id = ?`,
                        returnColumnName: "id",
                        tableName: "betting_game_session",
                    };

                    updateCommonApiCall(dataToSend).then(() => {
                        resolve({ status: 1 });
                    });
                }
            } else {
                resolve({ status: 0, message: "A session already exists in this time range" });
            }
        });
    });
};




export const actionToGetGamePlatformDataApiCall = () => {
    return new Promise(function(resolve, reject) {
        let resultData = [];
        const query = 'SELECT * from betting_platform';
        pool.query(query,[], (error, results) => {
            if (error) {
                reject(error)
            }
            if(results?.length){
                resultData = results;
            }
            resolve(resultData);
        })
    })
}

export const actionToDeleteGameSessionDataApiCall = ({id}) => {
    return new Promise(function(resolve) {
        let condition = `id = ?`;
        let tableName = "betting_game_session";
        deleteCommonApiCall({condition, tableName, values: [id]}).then(() => {
            resolve({status:true});
        })
    })
}

export const actionToUpdateIsOnlineUseDataApiCall = (userId,{isOnline}) => {
    return new Promise(function(resolve) {
        let setData = `is_online = ?`;
        const whereCondition = `id = ? AND role != ?`;
        let dataToSend = {column: setData, value: [isOnline,userId,1], whereCondition: whereCondition, returnColumnName:'id',tableName: 'app_user'};
        updateCommonApiCall(dataToSend).then(()=>{
            resolve({status:1});
        })
    })
}

export const actionToUpdateBettingUserIsOnlineUseDataApiCall = (userId,{isOnline}) => {
    return new Promise(function(resolve) {
        let setData = `is_online = ?`;
        const whereCondition = `user_id = ?`;
        let dataToSend = {column: setData, value: [isOnline,userId], whereCondition: whereCondition, returnColumnName:'id',tableName: 'betting_active_users'};
        updateCommonApiCall(dataToSend).then(()=>{
            resolve({status:1});
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
        const query = 'SELECT id,status,betting_game_session_id from betting_active_users WHERE user_id = ?';
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
        const query = 'SELECT * from betting_game_session WHERE id = ? AND is_active = ?';
        let userData = {};
        pool.query(query,[sessionId,1], (error, results) => {
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
    return new Promise(function (resolve, reject) {
        const dateFrom = moment().subtract(1, 'minute').format('YYYY-MM-DD HH:mm:ss');
        const dateTo = moment().format('YYYY-MM-DD HH:mm:ss');

        const query = `
            SELECT id, result, game_id, created_at 
            FROM game_result 
            WHERE betting_game_session_id = ? 
              AND created_at BETWEEN ? AND ?
              AND result IS NULL
        `;

        let userData = {};
        pool.query(query, [sessionId, dateFrom, dateTo], (error, results) => {
            if (error) {
                return reject(error);
            }
            if (results?.length) {
                userData = results[0];
            }
            resolve(userData);
        });
    });
};

export const actionToGetOrderStatusListDataApiCall = () => {
    return new Promise((resolve, reject) => {
        let query = actionToGetOrderStatusListDataQuery()
        pool.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);   // <-- return all rows, not just one
        });
    })
}

export const actionToGetAdminOderAndValueCountDataApiCall = () => {
    return new Promise((resolve, reject) =>{
        let query = `
            SELECT
                    (SELECT COUNT(*) FROM betting_active_users WHERE status = 1) AS active_users_count,
                    (SELECT COUNT(*) FROM bet_prediction_history) AS prediction_history_count,
                    COALESCE((
                                 SELECT SUM(u.wallet_balance)
                                 FROM betting_active_users bau
                                          JOIN app_user u ON u.id = bau.user_id
                                 WHERE bau.status = 1
                             ), 0) AS total_active_users_balance,
                    COALESCE((
                                 SELECT SUM(amount)
                                 FROM bet_prediction_history
                             ), 0) AS total_prediction_history_balance,
                    (
                        COALESCE((
                                     SELECT SUM(u.wallet_balance)
                                     FROM betting_active_users bau
                                              JOIN app_user u ON u.id = bau.user_id
                                     WHERE bau.status = 1
                                 ), 0)
                            +
                        COALESCE((
                                     SELECT SUM(amount)
                                     FROM bet_prediction_history
                                 ), 0)
                        ) AS combined_total_value;


        `
        pool.query(query, [], (error, results) => {
            if (error) {
                console.error("Database Query Error:", error);
                return reject(error);
            }
            let userData = {}
            if (results && results.length > 0) {
                userData = results[0];
            }
            resolve(userData);
        });
    })
}

export const actionToGetAdminAllDashboardCountDataApiCall = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT
                -- Total Transactions
                (SELECT COUNT(id) FROM user_transaction_history) AS total_transactions_count,
                (SELECT COALESCE(SUM(amount), 0) FROM user_transaction_history) AS total_transaction_amount,

                -- Game Transactions
                (SELECT COUNT(id) FROM bet_prediction_history) AS game_transactions_count,
                (SELECT COALESCE(SUM(amount), 0) FROM bet_prediction_history) AS game_transaction_amount,

                -- Today's Earnings
                (SELECT COALESCE(SUM(subscriptions.price), 0)
                 FROM user_subscriptions
                          INNER JOIN subscriptions ON user_subscriptions.subscription_id = subscriptions.id
                 WHERE DATE(user_subscriptions.created_at) = CURDATE()) AS todays_earning,

                -- Total Earnings
                (SELECT COALESCE(SUM(subscriptions.price), 0)
            FROM user_subscriptions
                INNER JOIN subscriptions ON user_subscriptions.subscription_id = subscriptions.id) AS total_earning,

                -- Today's Betting
                (SELECT COALESCE(SUM(total_bet_amount), 0)
            FROM game_result
            WHERE DATE(created_at) = CURDATE()) AS todays_betting,

            -- Total Betting
                (SELECT COALESCE(SUM(total_bet_amount), 0) FROM game_result) AS total_betting,

                -- Online Users
                (SELECT COUNT(*) FROM app_user WHERE is_online = 1) AS online_users,
                                                   
                (SELECT COUNT(*) FROM app_user  WHERE is_test_user != 1) AS total_users,

           -- Playing Users
         (SELECT COUNT(*) FROM betting_active_users WHERE is_online = 1) AS playing_users,

         -- Current Order
         (SELECT COUNT(*) FROM bet_prediction_history WHERE DATE(created_at) = CURDATE()) AS current_orders_count,
        (SELECT COUNT(*) FROM bet_prediction_history) AS total_orders_count,

            
          (SELECT COALESCE(SUM(amount), 0) FROM bet_prediction_history WHERE DATE(created_at) = CURDATE()) AS today_orders_amount_sum,
          (SELECT COALESCE(SUM(amount), 0) FROM bet_prediction_history) AS total_orders_amount_sum,
                                                                                                
       (SELECT COALESCE(SUM(app_user.betting_balance), 0) FROM betting_active_users
                INNER JOIN app_user ON betting_active_users.user_id = app_user.id
            WHERE betting_active_users.status = 1) AS total_betting_balance,

            -- Total Subscriptions
                (SELECT COUNT(*) FROM user_subscriptions) AS total_subscriptions,

                -- Total Active Subscriptions
                (SELECT COUNT(*) FROM user_subscriptions WHERE is_active = 1) AS total_active_subscriptions,


            (SELECT COALESCE(SUM(subscriptions.price), 0)
             FROM user_subscriptions
                      INNER JOIN subscriptions ON user_subscriptions.subscription_id = subscriptions.id
             WHERE user_subscriptions.is_active = 1
             ) AS total_active_subscriptions_cost,
            
            (SELECT COALESCE(SUM(subscriptions.price), 0)
             FROM user_subscriptions
                      INNER JOIN subscriptions ON user_subscriptions.subscription_id = subscriptions.id
            
             ) AS total_subscriptions_cost
        `;

        let userData = {
            total_transactions_count: 0,
            total_transaction_amount: 0,
            game_transactions_count: 0,
            game_transaction_amount: 0,
            todays_earning: 0,
            today_orders_amount_sum: 0,
            total_earning: 0,
            todays_betting: 0,
            total_betting: 0,
            online_users: 0,
            total_orders_amount_sum: 0,
            current_orders_count: 0,
            total_betting_balance: 0,
            total_subscriptions: 0,
            total_active_subscriptions: 0
        };

        pool.query(query, [], (error, results) => {
            if (error) {
                console.error("Database Query Error:", error);
                return reject(error);
            }
            if (results && results.length > 0) {
                userData = results[0];
            }
            resolve(userData);
        });
    });
};

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

export const actionToApprovePasscodeRequestAndGeneratePasscodeApiCall = (userId,body) => {
    return new Promise(function(resolve, reject) {
        const {requestPasscodeCount} = body;
        function generateRandomString(length = 8) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result.toUpperCase();
        }

        const query = `SELECT role,wallet_balance from app_user WHERE id = ?`;
        pool.query(query, [userId], (error, results) => {
            if (error) {
                reject(error)
            }
            if (results?.length) {
                let userWalletBalance = results[0]?.wallet_balance;
                let role = results[0]?.role;
                let moneyCount = Number(requestPasscodeCount) * (role === 1 ? 10000 : 1000);
                if(moneyCount <= userWalletBalance){
                    let lengthLoop = requestPasscodeCount; // Default length loop to 5 if id is not provided
                    let valuesArray = [];

                    for (let i = 0; i < lengthLoop; i++) {
                        valuesArray.push([userId,generateRandomString(),role === 1 ? 2 : 3, userId]);
                    }

                    const insertData = {
                        column: ["user_id", "code","role","created_by"],
                        valuesArray: valuesArray,
                        tableName: 'pass_code'
                    };

                    bulkInsertCommonApiCall(insertData).then(() => {
                        let setData = `wallet_balance = wallet_balance - ?`;
                        const whereCondition = `id = ?`;
                        let dataToSend = {column: setData, value: [moneyCount,userId], whereCondition: whereCondition, returnColumnName:'id',tableName: 'app_user'};
                        updateCommonApiCall(dataToSend).then(()=>{
                            resolve({status:1});

                            ////////// UPDATE USER PERCENTAGE IN DB ////////////////
                            const user_transaction_history_id = `${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}`;
                            let aliasArray = ['?', '?', '?', '?'];
                            let columnArray = ["id", "amount", "user_id", "type"];
                            let valuesArray = [user_transaction_history_id, moneyCount, userId, 'purchased_passcodes'];
                            let insertData = {
                                alias: aliasArray,
                                column: columnArray,
                                values: valuesArray,
                                tableName: 'user_transaction_history'
                            };
                            insertCommonApiCall(insertData).then(() => {})
                            ////////// UPDATE USER PERCENTAGE IN DB ////////////////

                        })
                    }).catch((err) => {
                        console.error('Error during bulk insert:', err);
                        reject({ status: 0, error: err });
                    });
                }else{
                    reject({ status: 0, error: 'Insufficient balance' });
                }
            }
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



        let query = `SELECT 
                            us.id,
                            us.balance,
                            us.created_at,
                            us.expiry_date,
                            us.is_active
                        FROM user_subscriptions us
                        WHERE us.created_by = ? AND us.is_active = ?;
                        `;

        pool.query(query,[userId,1], (error, results) => {
            let topupBalance = 0;
            if (results?.length) {
                let subscriptionData = results[0];
                if (subscriptionData?.id && subscriptionData?.balance > 0 && new Date(subscriptionData?.expiry_date) > new Date()) {
                    topupBalance = subscriptionData?.balance;
                }
            }
            let setData = `is_active = ?`;
            const whereCondition = `created_by = ? AND is_active = ?`;
            let dataToSend = {column: setData, value: [0,userId,1], whereCondition: whereCondition, returnColumnName:'id',tableName: 'user_subscriptions'};
            updateCommonApiCall(dataToSend).then(()=>{
                query = `SELECT * from subscriptions WHERE id = ?`;
                pool.query(query, [plan.id], (error, results) => {
                    if (error) {
                        reject(error)
                    }
                    if (results?.length) {
                        let subscription_id = results[0]?.id;
                        let plan_type = results[0]?.name;
                        let plan_price = Number(results[0]?.price);
                        let total_value = results[0]?.value;
                        let balance = Number(results[0]?.value) + Number(topupBalance);
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
export const actionToGetUserBetPredictionHistoryApiCall = (userId,sessionId) => {
    return new Promise(function(resolve, reject) {
        let predData = [];
        const query = `SELECT *
                           FROM bet_prediction_history
                           INNER JOIN game_result ON bet_prediction_history.game_result_id = game_result.id
                           WHERE bet_prediction_history.user_id = ?
                           AND bet_prediction_history.status = ?
                           AND bet_prediction_history.game_type = ?
                           AND game_result.betting_game_session_id = ?
                           ORDER BY bet_prediction_history.bet_id desc
                           LIMIT 20`;
        pool.query(query,[userId,0,'win_go',sessionId], (error, results) => {
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

export const actionToGetGameHistoryDataApiCall = (userId,role,body) => {
    let {payload} = body;
    return new Promise(function(resolve, reject) {
        let responseData = [];
        const {query,values} = getGameHistoryQuery(userId,role,payload);
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


export const actionToGetAllUsersSubscriptionsDataApiCall = (body) => {
    let {payload} = body;
    return new Promise(function(resolve, reject) {
        let responseData = [];
        const {query,values} = actionToGetAllUsersSubscriptionsDataQuery(payload);
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

export const actionToGetMoneyTransactionDataApiCall = (userId,role,body) => {
    let {payload} = body;
    return new Promise(function(resolve, reject) {
        let responseData = [];
        const {query,values} = getMoneyTransactionsQuery(userId,role,payload);
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
        const created_at_min = moment().subtract(1, 'minute').format();
        const {query,values} = getGameResultListQuery(userId,created_at_min,payload);
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
    let {isAdminPasscodePage} = body;
    return new Promise(function(resolve, reject) {
        let responseData = [];
        const {query,values} = getAdminPassCodeListQuery(userId,isAdminPasscodePage);
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

export const actionToGetAllUsersUnderSubAdminListApiCall = (userId,body) => {
    let { uidSearchText } = body;
    return new Promise(function(resolve, reject) {
        let condition = ``;
        let values = [userId];
        if (uidSearchText) {
            condition += ` AND app_user.uid LIKE ?`;
            values.push(`%${uidSearchText}%`);
        }
        let responseData = [];
        const query = `SELECT id,app_user.uid,name,phone_number,created_at,wallet_balance from app_user WHERE sub_admin = ? ${condition}`;
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

export const actionToGetAllUsersNormalAndSubAdminListApiCall = (userId, body) => {
    let { type,uidSearchText } = body;
    return new Promise(function(resolve, reject) {
        let responseData = [];
        let condition = ``;
        let values = [userId];

        // Add condition for type if provided
        if (type && type !== 'All') {
            values.push(type);
            condition += ` AND app_user.role = ?`;  // Add 'type' condition
        }

        if (uidSearchText) {
            condition += ` AND (app_user.uid LIKE ? OR app_user.sno = ? OR app_user.name = ?)`;
            values.push(`%${uidSearchText}%`);
            values.push(`%${uidSearchText}%`);
            values.push(uidSearchText);
        }

        const query = `SELECT app_user.id,app_user.sno,app_user.uid,app_user.name,app_user.phone_number,app_user.created_at,app_user.wallet_balance,app_user.game_balance,app_user.role,sub_admin_user.name as sub_admin_name from app_user 
                               LEFT JOIN app_user as sub_admin_user ON sub_admin_user.id = app_user.id                                                             
                               WHERE app_user.is_test_user != 1 AND app_user.id != ? ${condition} ORDER BY app_user.sno asc`;
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

export const actionToInactiveCurrentSessionApiCall = (body) => {
    const {id} = body;
    return new Promise(function(resolve) {
        let setData = `is_active = ?`;
        const whereCondition = `id = ?`;
        let dataToSend = {column: setData, value: [0,id], whereCondition: whereCondition, returnColumnName:'id',tableName: 'betting_game_session'};
        updateCommonApiCall(dataToSend).then(()=>{
            resolve({success:1});
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
                        value: [parseFloat((Number(allBetData.amount) * 2) - (0.02 * Number(allBetData.amount))).toFixed(2)
                            , allBetData.user_id],
                        whereCondition: whereCondition,
                        returnColumnName: 'id',
                        tableName: 'app_user',
                    };
                    userTrnsectionType = 'game_loose_amount_credit';
                    amountToDeduct = (Number(allBetData.amount) * 2) - (0.02 * Number(allBetData.amount));
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
    return new Promise(function (resolve) {
        const queryUserBalance = `SELECT betting_balance FROM app_user WHERE id = ?`;

        pool.query(queryUserBalance, [userId], (error, results) => {
            if (error) {
                return resolve(error);
            }

            if (results?.length) {
                let userBettingBalance = results[0]?.betting_balance;

                const querySubscription = `SELECT expiry_date, balance FROM user_subscriptions WHERE created_by = ? AND is_active = ?`;

                pool.query(querySubscription, [userId,1], (error, subResults) => {
                    if (error) {
                        return resolve(error);
                    }

                    if (subResults?.length) {
                        let subExpiryDate = new Date(subResults[0]?.expiry_date);
                        let subBalance = subResults[0]?.balance;
                        let currentDate = new Date();

                        // Check conditions
                        if (subExpiryDate < currentDate) {
                            return resolve({ success: 0, message: "Subscription expired." });
                        }
                        if (subBalance < 10) {
                            return resolve({ success: 0, message: "Insufficient subscription balance." });
                        }
                        if (userBettingBalance < 10) {
                            return resolve({ success: 0, message: "Insufficient betting balance." });
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
                            .catch((err) => resolve(err));
                    } else {
                        resolve({ success: 0, message: "No subscription found." });
                    }
                });
            } else {
                resolve({ success: 0, message: "User not found." });
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

export const actionToCallFunctionToActiveSectionAndStartGameApiCall = (userId,sessionId,customNumberId) => {
    return new Promise(function(resolve) {
        let setData = `started_by = ? , is_active = ? , serial_number = ?`;
        const whereCondition = `id = ?`;
        let dataToSend = {
            column: setData,
            value: [userId, 1, Number(customNumberId),sessionId],
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
export function actionToRunCheckForAliveUsers(sessionId,gameType,gameResultId,gameBetId) {
    try {
        pool.query(getAliveUsersQuery(), [1], (error, results) => {
            if (error) {
                console.error('Database Query Error:', error);
                return;
            }


            ////////////// REUPDATE TO 3 STATUS /////////////
            updateCommonApiCall({column: `status = ?`, value: [3,0], whereCondition: `is_test_user = ?`, returnColumnName:'id',tableName: 'betting_active_users'}).then(()=>{})
            ////////////// REUPDATE TO 3 STATUS /////////////

            //////////// UPDATE PREV TO 3 STATUS /////////////
            updateCommonApiCall({column: `status = ?`, value: [0,1], whereCondition: 'status = ?', returnColumnName:'id',tableName: 'bet_prediction_history'}).then(()=>{})
            ////////////// UPDATE PREV TO 3 STATUS /////////////

            if (results?.length > 1) {
                const filteredUsers = results
                    .filter(user => user.is_test_user === 1 || user.subscription_id) // Remove test users & users without a subscription
                    .map(user => ({
                        ...user,
                        balance: user.subscription_id ? Math.min(user.subscription_balance, user.balance) : user.balance // Update betting_balance
                    }));

                if (filteredUsers.length > 1) {
                    const hasRealUser = results.some(user => user.is_test_user === 0);
                    if (hasRealUser) {
                        actionToDistributeBettingFunctionAmongUsers(filteredUsers,sessionId,gameType,gameResultId,gameBetId);
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

export const actionToGetGamePredictionHistoryDataApiCall = (userId,role,body) => {
    let {payload} = body;
    return new Promise(function(resolve, reject) {
        let responseData = [];
        const {query} = GetGamePredictionHistoryDataQuery(userId,role,payload);
        pool.query(query, (error, results) => {
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

export const actionToGetAllUserListDataApiCall = (userId,role,body) => {
    let {payload} = body;
    return new Promise(function(resolve, reject) {
        let responseData = [];
        const query = `SELECT * FROM app_user`;
        pool.query(query, (error, results) => {
            if (error) throw error;

            const usersById = results.reduce((acc, user) => {
                acc[user.id] = user;
                return acc;
            }, {});
            resolve(usersById);
        })
    })
}