
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
const actionToCallProcedureToSelectRightGroup = (allLiveUsersData) => {
    return new Promise((resolve, reject) => {
        // Validate input
        if (!Array.isArray(allLiveUsersData) || allLiveUsersData.length === 0) {
            return reject("No live users available or invalid input.");
        }

        let attemptCount = 0;
        const maxAttempts = 10;

        /**
         * Generates a random group of users and ensures it's unique.
         */
        const generateRandomGroup = () => {
            if (attemptCount >= maxAttempts) {
                return reject("Max attempts reached. Couldn't generate a unique group.");
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

                // Update user status to inactive and insert the group into history
                const setData = `status = ?`;
                const whereCondition = `id IN (${betActiveUserIds.map(() => '?').join(',')})`;
                const dataToSend = {
                    column: setData,
                    value: [2, ...betActiveUserIds],
                    whereCondition: whereCondition,
                    tableName: 'betting_active_users'
                };

                updateCommonApiCall(dataToSend)
                    .then(() => {
                        Object.keys(userSocketIdsObject).forEach((key) => {
                            if (userSocketIdsObject[key] && Array.isArray(selectedGroup)) {
                                userSocketIdsObject[key].emit('message', JSON.stringify({
                                    selectedGroup: [...selectedGroup], // Ensure userIdsArray exists
                                    type: "USER_DATA_FOR_READY_STATE",
                                }));
                            }
                        });
                        const insertData = {
                            alias: ['?', '?', '?'],
                            column: ["group_id", "game_type", "group_json"],
                            values: [groupId, "win_go", JSON.stringify(selectedGroup)],
                            tableName: 'user_game_group_history'
                        };
                        insertCommonApiCall(insertData)
                            .then(() => resolve(selectedGroup))
                            .catch(reject);
                    })
                    .catch((error) => {
                        console.error('Error updating status:', error);
                        reject(error);
                    });
            });
        };

        generateRandomGroup();
    });
};

/**
 * Distributes betting amounts among selected users and updates their balances.
 * @param {Array} allLiveUsersData - Array of live users data.
 */
export const actionToDistributeBettingFunctionAmongUsers = (allLiveUsersData) => {
    actionToCallProcedureToSelectRightGroup(allLiveUsersData)
        .then((allSelectedGroupUserData) => {
            const currentTime = new Date();
            const currentSeconds = currentTime.getSeconds();
            const currentMilliseconds = currentTime.getMilliseconds();

            // Calculate the time until the next minute mark
            const secondsUntilNextMinute = (60 - currentSeconds) % 60;
            const millisecondsUntilNextMinute = (1000 - currentMilliseconds) % 1000;
            const totalTimeUntilNextMinute = (secondsUntilNextMinute * 1000) + millisecondsUntilNextMinute;

            // Schedule the betting distribution after 1 minute
            setTimeout(() => {
                const userPayloadData = calculateUserBetAmount(allSelectedGroupUserData);

                if (!userPayloadData?.length) {
                    console.error("No user payload data available.");
                    return;
                }

                const gameBetId = userPayloadData[0]?.bet_id;
                const totalBetAmount = userPayloadData[0]?.total_bet_amount;

                if (!gameBetId || !totalBetAmount) {
                    console.error("Invalid gameBetId or totalBetAmount.");
                    return;
                }

                // Insert game result into the database
                const game_result_id = `${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}`;
                const insertResultData = {
                    alias: ['?', '?', '?', '?', '?'],
                    column: ["id", "game_type", "game_id", "total_bet_amount", "bet_distribution_json"],
                    values: [game_result_id, 'win_go', gameBetId, Number(totalBetAmount), JSON.stringify(userPayloadData)],
                    tableName: 'game_result'
                };

                insertCommonApiCall(insertResultData)
                    .then(() => {
                        const valuesArray = [];
                        const updatesArray = [];
                        const valuesArrayUserTransaction = [];
                        const updatesBetUserActiveArray = [];
                        const betActiveUserIds = [];
                        const betPredictionHistoryIdsArray = [];

                        userPayloadData.forEach((userPredData) => {
                            const amountToDeduct = Number(userPredData?.amount) - Math.round(0.02 * Number(userPredData?.amount));
                            const bet_prediction_history_id = `${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}`;
                            const user_transaction_history = `${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}-${_getRandomUniqueIdBackendServer()}`;

                            betPredictionHistoryIdsArray.push(bet_prediction_history_id);
                            valuesArray.push([bet_prediction_history_id, userPredData.user_id, userPredData?.min, userPredData?.betting_active_users_id, userPredData?.option_name, userPredData?.amount, userPredData?.bet_id, 1, 'win_go', game_result_id]);
                            if(!userPredData?.is_test_user) {
                                updatesArray.push({
                                    conditionValue: userPredData.user_id,
                                    set: {betting_balance: Number(userPredData?.balance_after_deduct_percentage)}
                                });
                            }
                            updatesBetUserActiveArray.push({
                                conditionValue: userPredData.betting_active_users_id,
                                set: { status: 1 }
                            });
                            betActiveUserIds.push(userPredData.betting_active_users_id);
                            valuesArrayUserTransaction.push([user_transaction_history, amountToDeduct, userPredData?.user_id, 'game_play_deduct']);
                        });

                        // Insert bet prediction history
                        const insertData = {
                            column: ["id", "user_id", "min", "betting_active_users_id", "option_name", "amount", "bet_id", "status", "game_type", "game_result_id"],
                            valuesArray: valuesArray,
                            tableName: 'bet_prediction_history'
                        };

                        bulkInsertCommonApiCall(insertData)
                            .then(() => {
                                console.log('Inserted IDs:', betPredictionHistoryIdsArray);

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
                                        .then(() => {
                                            console.log('Status updated to 0 for IDs:', betPredictionHistoryIdsArray);

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
                                                .then(() => {

                                                    Object.keys(userSocketIdsObject).forEach((key) => {
                                                        if (userSocketIdsObject[key] && Array.isArray(allSelectedGroupUserData)) {
                                                            userSocketIdsObject[key].emit('message', JSON.stringify({
                                                                selectedGroup: [...allSelectedGroupUserData], // Ensure userIdsArray exists
                                                                type: "USER_BETTING_TIME_END",
                                                            }));
                                                        }
                                                    });

                                                    actionToRunCheckForAliveUsers(); // Restart checking for alive users
                                                })
                                                .catch((error) => {
                                                    console.error('Error updating status:', error);
                                                });
                                        })
                                        .catch((error) => {
                                            console.error('Error updating status:', error);
                                        });
                                }, totalTimeUntilNextMinute);
                                /////////////////////   STOP TIMER AND EXPIRE BET AFTER 1 MIN ////////////////
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });

                        // Update user game balance
                        const updateData = { tableName: "app_user", updates: updatesArray, conditionColumn: "id" };
                        bulkUpdateCommonApiCall(updateData)
                            .then((response) => console.log("Bulk update successful:", response))
                            .catch((error) => console.error("Bulk update error:", error));

                        // Insert user transaction history
                        const insertUserTransData = {
                            column: ["id", "amount", "user_id", "type"],
                            valuesArray: valuesArrayUserTransaction,
                            tableName: 'user_transaction_history'
                        };
                        bulkInsertCommonApiCall(insertUserTransData)
                            .then(() => console.log("User transaction history inserted."))
                            .catch((error) => console.error('Error:', error));

                        // Update betting_active_users status
                        const updateAllBetUserActiveData = {
                            tableName: "betting_active_users",
                            conditionColumn: "id",
                            updates: updatesBetUserActiveArray
                        };
                        bulkUpdateCommonApiCall(updateAllBetUserActiveData)
                            .then(() => {
                                Object.keys(userSocketIdsObject).forEach((key) => {
                                    if (userSocketIdsObject[key] && Array.isArray(allSelectedGroupUserData)) {
                                        userSocketIdsObject[key].emit('message', JSON.stringify({
                                            selectedGroup: [...allSelectedGroupUserData], // Ensure userIdsArray exists
                                            type: "USER_BETTING_DATA_RECEIVED",
                                        }));
                                    }
                                });
                            })
                            .catch((error) => console.error("Bulk update error:", error));
                    })
                    .catch((error) => {
                        console.error('Error inserting game result:', error);
                        actionToRunCheckForAliveUsers(); // Restart checking for alive users
                    });
            }, totalTimeUntilNextMinute);
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