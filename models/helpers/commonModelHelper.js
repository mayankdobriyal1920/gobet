import pool from "../connection.js";
import {getAliveUsersQuery} from "../../queries/commonQuries.js";
import {calculateUserBetAmount} from "./bettingDistributionHelper.js";

export const createNewSessionWithUserDataAndRole = (req, userData) => {
    return new Promise((resolve, reject) => {
        if (req?.session?.userSessionData) {
            const oldSessionId = req?.session?.id;
            // Destroy the old session first and then regenerate
            req?.session?.regenerate((err) => {
                deleteOldSessionFileFromSessionStore(oldSessionId).then(() => {});
                storeNewSessionFileFromSessionStore(req,userData);
                resolve(true); // Resolve the promise
            });
        } else {
            // If no session exists, create a new one
            storeNewSessionFileFromSessionStore(req,userData);
            resolve(true); // Resolve the promise
        }
    });
};



export async function deleteOldSessionFileFromSessionStore(oldSessionId) {
    let condition = `sid = '${oldSessionId}'`;
    let tableName = "sessions";
    await deleteCommonApiCall({condition, tableName})
}
export const insertCommonApiCall = (body) => {
    const {column,alias,tableName,values} = body;
    return new Promise(function(resolve, reject) {
        const query =`INSERT INTO ${tableName} (${column.toString()}) VALUES (${alias.toString()})`;
        pool.query(query,values, (error) => {
            if (error) {
                reject(error)
            }
            let data = {success:1};
            resolve(data);
        })
    })
}
export function deleteCommonApiCall({condition, tableName}) {
    return new Promise(function(resolve, reject) {
        let deleteQuery = `DELETE FROM ${tableName} WHERE ${condition}`;
        pool.query(deleteQuery, (error) => {
            if (error) {
                console.log('error in inserting session', error)
                reject(error);
            }
            resolve({success:true});
        })
    })
}

export const updateCommonApiCall = (body) => {
    const {column,value,whereCondition,tableName} = body;
    try {
        return new Promise(function(resolve, reject) {
            const query = `UPDATE ${tableName} set ${column.toString()} WHERE ${whereCondition}`;
            pool.query(query,value, (error) => {
                if (error) {
                    reject(error)
                }
                let data = {success:1};
                resolve(data);
            })
        })
    }catch (e){
        return e;
    }
}

export function storeNewSessionFileFromSessionStore(req,userSessionData) {
    if(userSessionData?.id) {
        req.session.userSessionData = userSessionData;
        let insertQuery = `INSERT INTO sessions (${['sid', 'sess', 'expire'].toString()})
                           VALUES (${['$1', '$2', '$3'].toString()})`;
        pool.query(insertQuery, [req.session?.id, req.session, req.session?.cookie?.expires], (error) => {
            if (error) {
                console.log('error in inserting session', error)
            }
        })
    }
}

export const actionToGetAliveUserAndStartTimerOnIt = () => {
    // Query to check if there are other active users
    const getAliveUsersQuery = `SELECT id FROM betting_active_users WHERE status = $1`;
    pool.query(getAliveUsersQuery, [1], (error, results) => {
        // If there are other alive users, trigger the function
        if (results?.rows?.length === 1) {
            // More than 1 alive user, trigger the function
            actionToStartUserAliveCheckTimer(); // Replace this with the function you want to trigger
        }
    });
}

const actionToDistributeBettingFunctionAmongUsers = (allLiveUsersData)=>{
    // betting_active_users
    //20250104100010878 25-01-04 20:07
    let userPayloadData = calculateUserBetAmount(allLiveUsersData);

    userPayloadData?.map((userPredData)=>{
        let aliasArray = ['$1','$2','$3','$4','$6'];
        let columnArray = ["user_id", "min","betting_active_users_id","option_name","amount","bet_id"];
        let valuesArray = [userPredData.user_id,userPredData?.min,userPredData?.betting_active_users_id,userPredData?.option_name,userPredData?.amount,userPredData?.bet_id];
        let insertData = {alias: aliasArray, column: columnArray, values: valuesArray, tableName: 'betting_active_users'};
        insertCommonApiCall(insertData).then(()=>{})

        ///////// GAME 1% TRANSFER TO GAME WALLET //////////////
        let setData = `game_balance = $1`;
        const whereCondition = `id = '${userId}'`;
        let dataToSend = {column: setData, value: [Number(userPredData?.balance)], whereCondition: whereCondition, returnColumnName:'id',tableName: 'app_user'};
        updateCommonApiCall(dataToSend).then(()=>{
            ////////// UPDATE USER PERCENTAGE IN DB ////////////////
            aliasArray = ['$1','$2','$3'];
            columnArray = ["amount", "user_id","type"];
            valuesArray = [userPredData?.amount,userPredData?.user_id,'game_play_deduct'];
            insertData = {alias: aliasArray, column: columnArray, values: valuesArray, tableName: 'user_transaction_history'};
            insertCommonApiCall(insertData).then(()=>{})
            ////////// UPDATE USER PERCENTAGE IN DB ////////////////
        })

    })
}

export const actionToDeactivateSingleBetting = () => {
    let setData = `status = $1`;
    const whereCondition = `status = 1`;
    let dataToSend = {column: setData, value: [0], whereCondition: whereCondition, returnColumnName:'id',tableName: 'betting_active_users'};
    updateCommonApiCall(dataToSend).then(()=>{})
}

const actionToGetAllAliveUserDataFromBetLive = () => {
    pool.query(getAliveUsersQuery(), [1], (error, results) => {
        // If there are other alive users, trigger the function
        if (results?.rows?.length > 1) {
            // More than 1 alive user, trigger the function
            actionToDistributeBettingFunctionAmongUsers(results?.rows); // Replace this with the function you want to trigger
        }else{
            actionToDeactivateSingleBetting();
        }
    });
}

// Function to start the timer when the first user becomes active
const actionToStartUserAliveCheckTimer = () => {
    setTimeout(() => {
        actionToGetAllAliveUserDataFromBetLive();
    }, 4 * 60 * 1000);  // Run every 5 minutes (10 * 60 * 1000 ms)
};
