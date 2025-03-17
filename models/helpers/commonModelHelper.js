
import {getAliveUsersQuery} from "../../queries/commonQuries.js";
import {calculateUserBetAmount} from "./bettingDistributionHelper.js";
import {Vonage} from "@vonage/server-sdk";
import pool from "../connection.js";
import {actionToRunCheckForAliveUsers} from "../commonModel.js";
import {userSocketIdsObject} from "../../server.js";

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
    const { updates, tableName,amountUpdateCase = '', conditionColumn = 'id' } = body; // Default conditionColumn to 'id'

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
            let caseStatements = '';
            if(amountUpdateCase){
                caseStatements = columnsToUpdate.map((column) => {
                    const cases = updates
                        .map(() => `WHEN ${conditionColumn} = ? THEN ${amountUpdateCase}`) // ✅ Correct subtraction
                        .join(" ");
                    return `${column} = CASE ${cases} ELSE ${column} END`;
                });
            }else{
                caseStatements = columnsToUpdate.map((column) => {
                    const cases = updates
                        .map(() => `WHEN ${conditionColumn} = ? THEN ?`)
                        .join(" ");
                    return `${column} = CASE ${cases} ELSE ${column} END`;
                });
            }

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

// export const actionToGetAliveUserAndStartTimerOnIt = () => {
//     // Query to check if there are other active users
//     const getAliveUsersQuery = `SELECT id FROM betting_active_users WHERE status = ?`;
//     pool.query(getAliveUsersQuery, [3], (error, results) => {
//         // If there are other alive users, trigger the function
//         if (results?.length === 1) {
//             // More than 1 alive user, trigger the function
//             actionToStartUserAliveCheckTimer(); // Replace this with the function you want to trigger
//         }
//     });
// }
/**
 * Selects a random group of live users for a game and ensures the group is unique.
 * @param {Array} allLiveUsersData - Array of live users data.
 * @returns {Promise<Array>} - Resolves with the selected group of users.
 */
const actionToCallProcedureToSelectRightGroup = (allLiveUsersData = []) => {
    return new Promise((resolve, reject) => {
        // Validate input
        if (!Array.isArray(allLiveUsersData) || allLiveUsersData.length === 0) {
            return resolve([]);
        }

        let attemptCount = 0;
        const maxAttempts = 10;

        /**
         * Generates a random group of users and ensures it's unique.
         */
        const generateRandomGroup = () => {
            if (attemptCount >= maxAttempts) {
                return resolve([]);
            }
            attemptCount++;

            /**
             * Generates a random group size between minSize and maxSize.
             * @param {number} minSize - Minimum group size.
             * @param {number} maxSize - Maximum group size.
             * @returns {number} - Random group size.
             */
            const getRandomGroupSize = (minSize, maxSize) => {
                return Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
            };

            /**
             * Selects a random group of users from the given array.
             * @param {Array} users - Array of users.
             * @param {number} groupSize - Size of the group to select.
             * @returns {Array} - Randomly selected group of users.
             */
            const selectRandomGroup = (users, groupSize) => {
                if (!users.length || groupSize <= 0) return [];
                const shuffledUsers = [...users].sort(() => 0.5 - Math.random()); // Shuffle users
                return shuffledUsers.slice(0, groupSize);
            };

            const minGroupSize = 2;
            const maxGroupSize = allLiveUsersData.length;
            const groupSize = getRandomGroupSize(minGroupSize, maxGroupSize);
            console.log(`Random Group Size: ${groupSize}`);

            const selectedGroup = selectRandomGroup(allLiveUsersData, groupSize);
            if (selectedGroup.length === 0) {
                return generateRandomGroup(); // Retry if no users are selected
            }

            const hasRealUser = selectedGroup.some(user => user.is_test_user === 0);

            if (!hasRealUser) {
                return generateRandomGroup(); // Retry if no users are selected
            }

            // Generate a unique group ID based on sorted phone numbers
            const phoneNumbers = selectedGroup.map(user => user.uid);
            const betActiveUserIds = selectedGroup.map(user => user.betting_active_users_id);
            const sortedPhoneNumbers = phoneNumbers.sort((a, b) => a.localeCompare(b));
            const groupId = sortedPhoneNumbers.join("-");

            // Check if the group already exists in the database
            const query = `SELECT id FROM user_game_group_history WHERE group_id = ? AND game_type = ?`;
            pool.query(query, [groupId, "win_go"], (error, results) => {
                if (error) {
                    return reject(error);
                }
                if (results?.length) {
                    return generateRandomGroup(); // Retry if group already exists
                }

                const insertData = {
                    alias: ['?', '?', '?'],
                    column: ["group_id", "game_type", "group_json"],
                    values: [groupId, "win_go", JSON.stringify(selectedGroup)],
                    tableName: 'user_game_group_history'
                };
                insertCommonApiCall(insertData)
                    .then(() => resolve(selectedGroup))
                    .catch(reject);
            });
        };

        generateRandomGroup();
    });
};
export function actionToExecuteFunctionInLast10Seconds() {
    function scheduleNextExecution() {
        const now = new Date();
        const currentSeconds = now.getSeconds();
        const millisecondsUntilNextMinute = (60 - currentSeconds) * 1000 - now.getMilliseconds();

        // Ensure the function runs at the last 10 seconds of the minute
        const delay = millisecondsUntilNextMinute - 10000;

        setTimeout(() => {
            executeAndScheduleNext();
        }, delay);
    }

    function executeAndScheduleNext() {
        const now = new Date();
        console.log(`Executing function at: ${now.toLocaleTimeString()}`);
        const query = `SELECT
                       bgs.id
                   FROM betting_game_session bgs
                   WHERE
                       bgs.game_type = ? AND is_active = ?
                     AND (bgs.start_time >= CURTIME() OR (bgs.start_time <= CURTIME() AND bgs.end_time >= CURTIME()))
                   GROUP BY
                       bgs.id, bgs.start_time, bgs.end_time, bgs.is_active
                   ORDER BY
                       bgs.start_time
                       LIMIT 1`;
        pool.query(query,["win_go",1], (error, results) => {
            if(results?.length){
                actionToRunCheckForAliveUsers(results[0]?.id);
            }
        })
        // Calculate the time until the next exact minute (X:00:00)
        const nextExecutionDelay = (60 - new Date().getSeconds()) * 1000;
        setTimeout(scheduleNextExecution, nextExecutionDelay);
    }

    // Start the first execution scheduling
    scheduleNextExecution();
}
/**
 * Distributes betting amounts among selected users and updates their balances.
 * @param {Array} allLiveUsersData - Array of live users data.
 * @param sessionId
 */
export const actionToDistributeBettingFunctionAmongUsers = (allLiveUsersData,sessionId) => {
    actionToCallProcedureToSelectRightGroup(allLiveUsersData)
        .then((allSelectedGroupUserData) => {
            // Schedule the betting distribution after 1 minute
            const userPayloadData = calculateUserBetAmount(allSelectedGroupUserData);
            if(userPayloadData?.length) {
                const gameBetId = userPayloadData[0]?.bet_id;
                const totalBetAmount = userPayloadData[0]?.total_bet_amount;

                if (!gameBetId || !totalBetAmount) {
                    console.error("Invalid gameBetId or totalBetAmount.");
                    return;
                }

                // Insert game result into the database
                const game_result_id = `${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}`;
                const insertResultData = {
                    alias: ['?', '?', '?', '?', '?' , '?'],
                    column: ["id", "game_type", "game_id", "total_bet_amount", "bet_distribution_json" , "betting_game_session_id"],
                    values: [game_result_id, 'win_go', gameBetId, Number(totalBetAmount), JSON.stringify(userPayloadData),sessionId],
                    tableName: 'game_result'
                };

                insertCommonApiCall(insertResultData)
                    .then(() => {
                        const valuesArray = [];
                        const updatesArray = [];
                        const updatesSubscriptionBalanceArray = [];
                        const valuesArrayUserTransaction = [];
                        const updatesBetUserActiveArray = [];
                        const betActiveUserIds = [];
                        const betPredictionHistoryIdsArray = [];

                        userPayloadData.forEach((userPredData) => {
                            const bet_prediction_history_id = `${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}`;
                            const user_transaction_history = `${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}`;

                            betPredictionHistoryIdsArray.push(bet_prediction_history_id);
                            valuesArray.push([bet_prediction_history_id, userPredData.user_id, userPredData?.min, userPredData?.betting_active_users_id, userPredData?.option_name, userPredData?.amount, userPredData?.bet_id, 1, 'win_go', game_result_id]);
                            if (!userPredData?.is_test_user) {
                                updatesArray.push({
                                    conditionValue: userPredData.user_id,
                                    set: {betting_balance: userPredData?.amount}
                                });

                                updatesSubscriptionBalanceArray.push({
                                    conditionValue: userPredData.subscription_id,
                                    set: {balance: userPredData?.amount}
                                });

                                betActiveUserIds.push(userPredData.betting_active_users_id);
                            }

                            updatesBetUserActiveArray.push({
                                conditionValue: userPredData.betting_active_users_id,
                                set: {status: 1}
                            });

                            valuesArrayUserTransaction.push([user_transaction_history, userPredData?.amount, userPredData?.user_id, 'game_play_deduct']);
                        });


                        bulkInsertCommonApiCall({
                            column: ["id", "user_id", "min", "betting_active_users_id", "option_name", "amount", "bet_id", "status", "game_type", "game_result_id"],
                            valuesArray: valuesArray,
                            tableName: 'bet_prediction_history'
                        })
                            .then(() => {
                                // Update user game balance
                                bulkUpdateCommonApiCall({tableName: "app_user", updates: updatesArray, conditionColumn: "id",amountUpdateCase:`betting_balance - ?`})
                                    .then(() => {
                                    bulkUpdateCommonApiCall({tableName: "user_subscriptions", updates: updatesSubscriptionBalanceArray, conditionColumn: "id",amountUpdateCase:`balance - ?`})
                                        .then(() => {
                                            // Update betting_active_users status
                                            bulkUpdateCommonApiCall({
                                                tableName: "betting_active_users",
                                                conditionColumn: "id",
                                                updates: updatesBetUserActiveArray
                                            })
                                                .then(() => {
                                                    const nextExecutionDelay = (60 - new Date().getSeconds()) * 1000;
                                                    setTimeout(()=>{
                                                        Object.keys(userSocketIdsObject).forEach((key) => {
                                                            if (userSocketIdsObject[key] && Array.isArray(allSelectedGroupUserData)) {
                                                                userSocketIdsObject[key].emit('message', JSON.stringify({
                                                                    selectedGroup: [...allSelectedGroupUserData], // Ensure userIdsArray exists
                                                                    type: "USER_BETTING_DATA_RECEIVED",
                                                                }));
                                                            }
                                                        });

                                                        // Update betting_active_users status
                                                        const setDataActive = `status = ?`;
                                                        const whereConditionActive = `id IN (${betActiveUserIds.map(() => '?').join(',')})`;
                                                        const dataToSendActive = {
                                                            column: setDataActive,
                                                            value: [3, ...betActiveUserIds],
                                                            whereCondition: whereConditionActive,
                                                            tableName: 'betting_active_users'
                                                        };

                                                        updateCommonApiCall(dataToSendActive)
                                                            .then(() => {})
                                                            .catch((error) => {
                                                                console.error('Error updating status:', error);
                                                            });




                                                        /////////////////////   STOP TIMER AND EXPIRE BET AFTER 1 MIN ////////////////
                                                        setTimeout(() => {
                                                            const setData = `status = ?`;
                                                            const whereCondition = `id IN (${betPredictionHistoryIdsArray.map(() => '?').join(',')})`;
                                                            const values = [0, ...betPredictionHistoryIdsArray];
                                                            const dataToSend = {
                                                                column: setData,
                                                                value: values,
                                                                whereCondition: whereCondition,
                                                                tableName: 'bet_prediction_history',
                                                            };
                                                            updateCommonApiCall(dataToSend)
                                                                .then(() => {})
                                                                .catch((error) => {
                                                                    console.error('Error updating status:', error);
                                                                });
                                                        }, 50000);
                                                        /////////////////////   STOP TIMER AND EXPIRE BET AFTER 1 MIN ////////////////



                                                    },nextExecutionDelay)
                                                })
                                                .catch((error) => console.error("Bulk update error:", error));


                                            // Insert user transaction history
                                            bulkInsertCommonApiCall({
                                                column: ["id", "amount", "user_id", "type"],
                                                valuesArray: valuesArrayUserTransaction,
                                                tableName: 'user_transaction_history'
                                            })
                                                .then(() => console.log("User transaction history inserted."))
                                                .catch((error) => console.error('Error:', error));

                                        })
                                        .catch((error) => console.error("Bulk update error:", error));
                                    })
                                    .catch((error) => console.error("Bulk update error:", error));
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                    })
                    .catch((error) => {
                        console.error('Error inserting game result:', error);
                     });
            }
        })
        .catch((error) => {
            console.error('Error selecting group:', error);
        });
};



export function _getRandomUniqueIdBackendServer(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}