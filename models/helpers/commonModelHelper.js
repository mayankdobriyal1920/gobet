import pool from "../connection.js";

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
        let deleteQuery = `DELETE FROM ${tableName} ${condition}`;
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
