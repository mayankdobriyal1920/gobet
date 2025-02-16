
import {getAliveUsersQuery} from "../../queries/commonQuries.js";
import {calculateUserBetAmount} from "./bettingDistributionHelper.js";
import {Vonage} from "@vonage/server-sdk";
import pool from "../connection.js";

const vonage = new Vonage({
    apiKey: "93669403",
    apiSecret: "47hxkbdWHmxyaGFv"
})
export const createNewSessionWithUserDataAndRole = async (req, userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (req?.session?.userSessionData) {
                const oldSessionId = req.session.id;

                // Destroy old session and regenerate a new one
                req.session.regenerate(async (err) => {
                    if (err) {
                        console.error("Error regenerating session:", err);
                        return reject(err);
                    }

                    try {
                        await deleteOldSessionFileFromSessionStore(oldSessionId);
                        await storeNewSessionFileFromSessionStore(req, userData);
                        resolve(true);
                    } catch (error) {
                        console.error("Error storing new session:", error);
                        reject(error);
                    }
                });
            } else {
                // No session exists, create a new one
                try {
                    await storeNewSessionFileFromSessionStore(req, userData);
                    resolve(true);
                } catch (error) {
                    console.error("Error storing session:", error);
                    reject(error);
                }
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            reject(error);
        }
    });
};

export async function deleteOldSessionFileFromSessionStore(oldSessionId) {
    let condition = `session_id = ?`; // Use parameterized placeholder
    let tableName = "sessions";
    await deleteCommonApiCall({ condition, tableName, values: [oldSessionId] });
}

export const bulkInsertCommonApiCall = (body) => {
    const { column, valuesArray, tableName } = body;

    return new Promise((resolve, reject) => {
        // Prepare placeholders for multiple rows
        const valuePlaceholders = valuesArray
            .map((values) =>
                `(${values.map(() => `?`).join(", ")})`
            )
            .join(", ");

        // Flatten the valuesArray for query binding
        const flattenedValues = valuesArray.flat();

        // Construct the query
        const query = `
            INSERT INTO ${tableName} (${column.toString()})
            VALUES ${valuePlaceholders};
        `;

        // Execute the query
        pool.query(query, flattenedValues, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve({success:1}); // Return the last inserted ID
            }
        });
    });
};


export const insertCommonApiCall = (body) => {
    const { column, alias, tableName, values } = body;
    return new Promise((resolve, reject) => {
        // Construct the query with placeholders
        const query = `
            INSERT INTO ${tableName} (${column.toString()})
            VALUES (${alias.toString()});
        `;

        // Execute the query
        pool.query(query, values, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve({success:1});
            }
        });
    });
};

export async function deleteCommonApiCall({ condition, tableName, values }) {
    const query = `DELETE FROM ${tableName} WHERE ${condition};`;

    return new Promise((resolve, reject) => {
        pool.query(query, values, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.affectedRows); // Return the number of rows deleted
            }
        });
    });
}

export const updateCommonApiCall = (body) => {
    const { column, value, whereCondition, tableName } = body;
    try {
        return new Promise(function (resolve, reject) {
            // Construct the query with placeholders
            const query = `
                UPDATE ${tableName}
                SET ${column.toString()}
                WHERE ${whereCondition};
            `;

            // Execute the query
            pool.query(query, value, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    // Return success and the number of affected rows
                    let data = { success: 1, affectedRows: result.affectedRows };
                    resolve(data);
                }
            });
        });
    } catch (e) {
        return e;
    }
};

export const callFunctionToSendOtp = (phone,otp) => {
    //////// SEND OTP TO SMS ////////
    const from = "Get Bet"
    const to = `917017935899`
    const text = 'Your otp to log in get bet app is '+otp;

    vonage.sms.send({to, from, text})
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
    //////// SEND OTP TO SMS ////////
}
export const bulkUpdateCommonApiCall = (body) => {
    const { updates, tableName, conditionColumn = 'id' } = body; // Default conditionColumn to 'id'

    try {
        return new Promise((resolve, reject) => {
            // Validate inputs
            if (!updates || !Array.isArray(updates) || updates.length === 0) {
                return reject(new Error("Updates array is empty or invalid."));
            }
            if (!tableName || typeof tableName !== 'string') {
                return reject(new Error("Table name is invalid."));
            }

            // Construct the CASE statement for each column to update
            const columnsToUpdate = Object.keys(updates[0].set); // Get columns from the first update
            const caseStatements = columnsToUpdate.map((column) => {
                const cases = updates
                    .map(() => `WHEN ${conditionColumn} = ? THEN ?`)
                    .join(" ");
                return `${column} = CASE ${cases} ELSE ${column} END`;
            });

            // Flatten the values for the CASE statements
            const caseValues = updates.flatMap((update) => [
                update.conditionValue, // Condition value (e.g., user_id)
                ...Object.values(update.set), // Values to set
            ]);

            // Generate the WHERE clause for all rows to update
            const whereConditions = updates.map(() => `?`).join(", ");

            // Flatten the values for the WHERE clause
            const whereValues = updates.map((update) => update.conditionValue);

            // Combine all values for the query
            const values = [...caseValues, ...whereValues];

            // Construct the SQL query
            const query = `
                UPDATE ${tableName}
                SET ${caseStatements.join(", ")}
                WHERE ${conditionColumn} IN (${whereConditions});
            `;

            // Execute the query
            pool.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ success: 1, affectedRows: result.affectedRows });
                }
            });
        });
    } catch (e) {
        return Promise.reject(e);
    }
};

export async function storeNewSessionFileFromSessionStore(req, userSessionData) {
    if (userSessionData?.id) {
        req.session.userSessionData = userSessionData;

        // Ensure session data is stored as a JSON string
        const sessionData = JSON.stringify(req.session);
        const sessionId = req.session?.id || userSessionData.id; // Use session ID
        const expires = Math.floor(req.session?.cookie?.expires?.getTime() / 1000) || Math.floor(Date.now() / 1000) + 86400; // Default 1 day expiration if missing

        const insertQuery = `INSERT INTO sessions (session_id, data, expires) VALUES (?, ?, ?)
                             ON DUPLICATE KEY UPDATE data = VALUES(data), expires = VALUES(expires)`;

        try {
            await pool.query(insertQuery, [sessionId, sessionData, expires]);
        } catch (error) {
            console.error('Error inserting/updating session:', error);
        }
    }
}

export const actionToGetAliveUserAndStartTimerOnIt = () => {
    // Query to check if there are other active users
    const getAliveUsersQuery = `SELECT id FROM betting_active_users WHERE status = ?`;
    pool.query(getAliveUsersQuery, [2], (error, results) => {
        // If there are other alive users, trigger the function
        if (results?.length === 1) {
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
    let betActiveUserIds = [];
    let betPredictionHistoryIdsArray = [];


    if(userPayloadData?.length) {
        let gameBetId = userPayloadData[0]?.bet_id;
        if(!gameBetId){
            return;
        }
        ////////// UPDATE USER PERCENTAGE IN DB ////////////////
        const game_result_id = `${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}`;
        let aliasResultArray = ['?','?', '?'];
        let columnResultArray = ["id","game_type", "game_id"];
        let valuesResultArray = [game_result_id,'win_go', gameBetId];
        let insertResultData = {
            alias: aliasResultArray,
            column: columnResultArray,
            values: valuesResultArray,
            tableName: 'game_result'
        };
        insertCommonApiCall(insertResultData).then(() => {
            userPayloadData?.map((userPredData)=> {
                const bet_prediction_history_id = `${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}`;
                const user_transaction_history = `${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}`;
                betPredictionHistoryIdsArray.push(bet_prediction_history_id);
                valuesArray.push([bet_prediction_history_id,userPredData.user_id, userPredData?.min, userPredData?.betting_active_users_id, userPredData?.option_name, userPredData?.amount, userPredData?.bet_id,1,'win_go',game_result_id]);
                updatesArray.push({conditionValue:userPredData.user_id,set:{game_balance:Number(userPredData?.balance)}});
                updatesBerUserActiveArray.push({conditionValue:userPredData.betting_active_users_id,set:{status:1}});
                betActiveUserIds.push(userPredData.betting_active_users_id);
                valuesArrayUserTransaction.push([user_transaction_history,userPredData?.amount,userPredData?.user_id,'game_play_deduct']);
            })
            const insertData = {column: ["id","user_id", "min", "betting_active_users_id", "option_name", "amount", "bet_id","status","game_type","game_result_id"], valuesArray: valuesArray, tableName: 'bet_prediction_history'};

            bulkInsertCommonApiCall(insertData)
                .then(() => {
                    console.log('Inserted IDs:', betPredictionHistoryIdsArray);
                    let currentSecond = new Date().getSeconds();
                    const currentTime = new Date();
                    const currentSeconds = currentTime.getSeconds();
                    const currentMilliseconds = currentTime.getMilliseconds();

                    // Calculate the time until the next minute mark
                    const secondsUntilNextMinute = (60 - currentSeconds) % 60;
                    const millisecondsUntilNextMinute = (1000 - currentMilliseconds) % 1000;

                    const totalTimeUntilNextMinute = (secondsUntilNextMinute * 1000) + millisecondsUntilNextMinute;

                    /////// UPDATE BET DATA AFTER 1 MINUTE //////////
                    setTimeout(() => {
                        // Prepare the update data
                        let setData = `status = ?`; // Update the status column to 0
                        let whereCondition = `id IN (${betPredictionHistoryIdsArray.map(() => '?').join(',')})`;
                        let values = [0, ...betPredictionHistoryIdsArray];
                        let dataToSend = {
                            column: setData,
                            value: values, // Value to update (status = 0)
                            whereCondition: whereCondition,
                            tableName: 'bet_prediction_history',
                        };

                        // Perform the update
                        updateCommonApiCall(dataToSend)
                            .then(() => {
                                console.log('Status updated to 0 for IDs:', betPredictionHistoryIdsArray);
                            })
                            .catch((error) => {
                                console.error('Error updating status:', error);
                            });

                        //////// GET GAME BALANCE AND MAKE USER INACTIVE ///////////
                        setData = `status = ?`; // Update the status column to 0
                        whereCondition = `id IN (${betActiveUserIds.map(() => '?').join(',')})`;
                        dataToSend = {column: setData, value: [4,...betActiveUserIds], whereCondition: whereCondition, tableName: 'betting_active_users'};
                        // Perform the update
                        updateCommonApiCall(dataToSend)
                            .then(() => {
                                console.log('Status updated to 0 for IDs:', betPredictionHistoryIdsArray);
                            })
                            .catch((error) => {
                                console.error('Error updating status:', error);
                            });
                        //////// GET GAME BALANCE AND MAKE USER INACTIVE ///////////
                    }, totalTimeUntilNextMinute); // Delay of 1 minute from now
                    /////// UPDATE BET DATA AFTER 1 MINUTE //////////

                    //////////// UPDATE USER GAME BALANCE ///////////
                    const updateData = {tableName: "app_user", updates: updatesArray,conditionColumn: "id"};
                    bulkUpdateCommonApiCall(updateData)
                        .then((response) => console.log("Bulk update successful:", response))
                        .catch((error) => console.error("Bulk update error:", error));
                    //////////// UPDATE USER GAME BALANCE ///////////

                    /////////// INSERT USER TOTAL TRANSACTION DATA ////////
                    const insertUserTransData = {column: ["id","amount", "user_id","type"], valuesArray: valuesArrayUserTransaction, tableName: 'user_transaction_history'};
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
        })
        ////////// UPDATE USER PERCENTAGE IN DB ////////////////
    }

}

export const actionToDeactivateSingleBetting = () => {
    let condition = `status = ?`; // Use parameterized placeholder
    let tableName = "betting_active_users";
    deleteCommonApiCall({ condition, tableName, values: [2] }).then(()=>{})
}

const actionToGetAllAliveUserDataFromBetLive = () => {
    pool.query(getAliveUsersQuery(), [2], (error, results) => {
        // If there are other alive users, trigger the function
        if (results?.length > 1) {
            // More than 1 alive user, trigger the function
            actionToDistributeBettingFunctionAmongUsers(results); // Replace this with the function you want to trigger
        }else{
            actionToDeactivateSingleBetting();
        }
    });
}

// Function to start the timer when the first user becomes active
const actionToStartUserAliveCheckTimer = () => {
    const now = new Date();
    const currentMinutes = now.getMinutes();
    const currentSeconds = now.getSeconds();
    const currentMilliseconds = now.getMilliseconds();

    // Calculate the time until the next 2-minute mark
    const minutesUntilNextMark = (2 - (currentMinutes % 2)) % 2;
    const secondsUntilNextMark = (60 - currentSeconds) % 60;
    const millisecondsUntilNextMark = (1000 - currentMilliseconds) % 1000;

    const totalTimeUntilNextMark =
        (minutesUntilNextMark * 60 * 1000) +
        (secondsUntilNextMark * 1000) +
        millisecondsUntilNextMark;

    setTimeout(() => {
        actionToGetAllAliveUserDataFromBetLive();
    }, totalTimeUntilNextMark);
}



export function _getRandomUniqueIdBackendServer(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}