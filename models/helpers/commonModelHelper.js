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

export const bulkInsertCommonApiCall = (body) => {
    const { column, valuesArray, tableName } = body;

    return new Promise((resolve, reject) => {
        // Prepare placeholders for multiple rows
        const valuePlaceholders = valuesArray
            .map((values, index) =>
                `(${values.map((_, i) => `$${index * values.length + i + 1}`).join(", ")})`
            )
            .join(", ");

        // Flatten the valuesArray for query binding
        const flattenedValues = valuesArray.flat();

        // Construct the query
        const query = `
            INSERT INTO ${tableName} (${column.toString()})
            VALUES ${valuePlaceholders}
            RETURNING id;
        `;

        // Execute the query
        pool.query(query, flattenedValues, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.rows); // Return all inserted IDs
            }
        });
    });
};


export const insertCommonApiCall = (body) => {
    const { column, alias, tableName, values } = body;
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${tableName} (${column.toString()}) VALUES (${alias.toString()}) RETURNING id`;
        pool.query(query, values, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.rows[0].id); // Return the inserted row's ID
            }
        });
    });
};

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

export const bulkUpdateCommonApiCall = (body) => {
    const { updates, tableName, conditionColumn } = body;

    try {
        return new Promise((resolve, reject) => {
            // Construct the CASE statement for each column to update
            const columnsToUpdate = Object.keys(updates[0].set); // Get columns from the first update
            const caseStatements = columnsToUpdate.map((column) => {
                const cases = updates
                    .map(
                        (update) =>
                            `WHEN ${conditionColumn} = '${update.conditionValue}' THEN '${update.set[column]}'`
                    )
                    .join(" ");
                return `${column} = CASE ${cases} ELSE ${column} END`;
            });

            // Generate the WHERE clause for all rows to update
            const whereConditions = updates
                .map((update) => `'${update.conditionValue}'`)
                .join(", ");

            const query = `
                UPDATE ${tableName}
                SET ${caseStatements.join(", ")}
                WHERE ${conditionColumn} IN (${whereConditions});
            `;

            // Execute the query
            pool.query(query, [], (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ success: 1 });
                }
            });
        });
    } catch (e) {
        return Promise.reject(e);
    }
};



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
    pool.query(getAliveUsersQuery, [2], (error, results) => {
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

    let valuesArray = [];
    let updatesArray = [];
    let valuesArrayUserTransaction = [];
    let updatesBerUserActiveArray = [];
    userPayloadData?.map((userPredData)=> {
        valuesArray.push([userPredData.user_id, userPredData?.min, userPredData?.betting_active_users_id, userPredData?.option_name, userPredData?.amount, userPredData?.bet_id,1,'win_go']);
        updatesArray.push({conditionValue:userPredData.user_id,set:{game_balance:Number(userPredData?.balance)}});
        updatesBerUserActiveArray.push({conditionValue:userPredData.betting_active_users_id,set:{status:1}});
        valuesArrayUserTransaction.push([userPredData?.amount,userPredData?.user_id,'game_play_deduct']);
    })

    const insertData = {column: ["user_id", "min", "betting_active_users_id", "option_name", "amount", "bet_id","status","game_type"], valuesArray: valuesArray, tableName: 'bet_prediction_history'};

    bulkInsertCommonApiCall(insertData)
        .then((ids) => {
            let idInJoin = ids.map((uid)=> uid.id);
            console.log('Inserted IDs:', ids);
            ///////// FOR DEACTIVATE CALL IN 1 MIN /////////
            setTimeout(() => {
                // Prepare the update data
                const setData = `status = $1`; // Update the status column to 0
                const whereCondition = `id IN (${idInJoin.join(",")})`; // Use the IN operator for the IDs
                const dataToSend = {
                    column: setData,
                    value: [0], // Value to update (status = 0)
                    whereCondition: whereCondition,
                    tableName: 'bet_prediction_history',
                };

                // Perform the update
                updateCommonApiCall(dataToSend)
                    .then(() => {
                        console.log('Status updated to 0 for IDs:', ids);
                    })
                    .catch((error) => {
                        console.error('Error updating status:', error);
                });

                //////// GET GAME BALANCE AND MAKE USER INACTIVE ///////////
                //////// GET GAME BALANCE AND MAKE USER INACTIVE ///////////
            }, 1000 * 60); // Delay of 1 minute


            //////////// UPDATE USER GAME BALANCE ///////////
            const updateData = {tableName: "app_user", conditionColumn: "id", updates: updatesArray,};
            bulkUpdateCommonApiCall(updateData)
                .then((response) => console.log("Bulk update successful:", response))
                .catch((error) => console.error("Bulk update error:", error));
            //////////// UPDATE USER GAME BALANCE ///////////

            /////////// INSERT USER TOTAL TRANSACTION DATA ////////
            const insertUserTransData = {column: ["amount", "user_id","type"], valuesArray: valuesArrayUserTransaction, tableName: 'user_transaction_history'};
            bulkInsertCommonApiCall(insertUserTransData)
                .then(() => {})
                .catch((error) => {console.error('Error:', error)});
            /////////// INSERT USER TOTAL TRANSACTION DATA ////////


            //////////// UPDATE USER GAME BALANCE ///////////
            const updateAllBetUserActiveData = {tableName: "betting_active_users", conditionColumn: "id", updates: updatesBerUserActiveArray};
            bulkUpdateCommonApiCall(updateAllBetUserActiveData)
                .then((response) => console.log("Bulk update successful:", response))
                .catch((error) => console.error("Bulk update error:", error));
            //////////// UPDATE USER GAME BALANCE ///////////


        }).catch((error) => {
            console.error('Error:', error);
    });


    // userPayloadData?.map((userPredData)=>{
    //     let aliasArray = ['$1','$2','$3','$4','$6'];
    //     let columnArray = ["user_id", "min","betting_active_users_id","option_name","amount","bet_id"];
    //     let valuesArray = [userPredData.user_id,userPredData?.min,userPredData?.betting_active_users_id,userPredData?.option_name,userPredData?.amount,userPredData?.bet_id];
    //     let insertData = {alias: aliasArray, column: columnArray, values: valuesArray, tableName: 'bet_prediction_history'};
    //     console.log('insertData',insertData)
    //
    //
    //
    //
    //
    //
    //
    //
    //     insertCommonApiCall(insertData).then(()=>{
    //
    //         ///////// GAME 1% TRANSFER TO GAME WALLET //////////////
    //         let setData = `game_balance = $1`;
    //         const whereCondition = `id = '${userId}'`;
    //         let dataToSend = {column: setData, value: [Number(userPredData?.balance)], whereCondition: whereCondition, returnColumnName:'id',tableName: 'app_user'};
    //         updateCommonApiCall(dataToSend).then(()=>{
    //             ////////// UPDATE USER PERCENTAGE IN DB ////////////////
    //             aliasArray = ['$1','$2','$3'];
    //             columnArray = ["amount", "user_id","type"];
    //             valuesArray = [userPredData?.amount,userPredData?.user_id,'game_play_deduct'];
    //             insertData = {alias: aliasArray, column: columnArray, values: valuesArray, tableName: 'user_transaction_history'};
    //             insertCommonApiCall(insertData).then(()=>{
    //
    //             })
    //             ////////// UPDATE USER PERCENTAGE IN DB ////////////////
    //         })
    //
    //
    //     })
    // })



}

export const actionToDeactivateSingleBetting = () => {
    let setData = `status = $1`;
    const whereCondition = `status = 2`;
    let dataToSend = {column: setData, value: [4], whereCondition: whereCondition, returnColumnName:'id',tableName: 'betting_active_users'};
    updateCommonApiCall(dataToSend).then(()=>{})
}

const actionToGetAllAliveUserDataFromBetLive = () => {
    pool.query(getAliveUsersQuery(), [2], (error, results) => {
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
    }, 2 * 60 * 1000);  // Run every 2 minutes (10 * 60 * 1000 ms)
};
