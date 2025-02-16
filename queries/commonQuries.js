export const loginUserQuery = () => {
    return `
        SELECT
            app_user.id,
            app_user.name,
            app_user.profile_url,
            app_user.role,
            app_user.phone_number,
            app_user.wallet_balance,
            JSON_OBJECT(
                    'id', sub_admin_users.id,
                    'name', sub_admin_users.name,
                    'profile_picture', sub_admin_users.profile_url,
                    'role', sub_admin_users.role,
                    'phone_number', sub_admin_users.phone_number
            ) AS sub_admin
        FROM app_user
                 LEFT JOIN app_user AS sub_admin_users
                           ON sub_admin_users.id = app_user.sub_admin
        WHERE app_user.phone_number = ?;
    `;
};

export const checkMobNumberAlreadyExistQuery = () => {
    return `
        SELECT
            app_user.id,
            app_user.name
        FROM app_user
        WHERE app_user.phone_number = ?;
    `;
};

export const isPassCodeValidQuery = () => {
    return `
        SELECT
            pass_code.id,
            pass_code.user_id,
            pass_code.code
        FROM pass_code
        WHERE pass_code.allot_to IS NULL AND pass_code.code = ?;
    `;
};

export const signupQuery = () => {
    return `INSERT INTO app_user(id, name, phone_number, profile_url, sub_admin, wallet_balance, role, created_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
};

export const updatePassCodeQuery = () => {
    return `
        UPDATE pass_code SET allot_to = ?
        WHERE id = ?;
    `;
};

export const updateUserAvatarQuery = () => {
    return `
        UPDATE app_user SET profile_url = ?
        WHERE id = ?;
    `;
};

export const updateUserUserNameQuery = () => {
    return `
        UPDATE app_user SET name = ?
        WHERE id = ?;
    `;
};

export const getWithdrawalHistoryQuery = (userId, body) => {
    let { status, created_at } = body;
    let values = [userId];  // Initial values array with userId
    let condition = `user_id = ?`;  // Initial condition with userId

    // Add condition for status if provided
    if (status && status !== 'All') {
        values.push(status === 'Pending' ? 0 : 1);  // Append the status value (1 for 'Pending', 0 otherwise)
        condition += ` AND status = ?`;  // Add 'status' condition
    }

    // Add condition for created_at if provided
    if (created_at) {
        values.push(created_at);  // Append the created_at value
        condition += ` AND DATE(created_at) = ?`;  // Add 'created_at' condition
    }

    // Final query
    let query = `SELECT * FROM withdrawal_history WHERE ${condition} ORDER BY created_at DESC`;

    return { values, query };
};

export const getDepositHistoryQuery = (userId, body) => {
    let { status, created_at } = body;
    let values = [userId];  // Initial values array with userId
    let condition = `user_id = ?`;  // Initial condition with userId

    // Add condition for status if provided
    if (status && status !== 'All') {
        values.push(status === 'Pending' ? 0 : 1);  // Append the status value (1 for 'Pending', 0 otherwise)
        condition += ` AND status = ?`;  // Add 'status' condition
    }

    // Add condition for created_at if provided
    if (created_at) {
        values.push(created_at);  // Append the created_at value
        condition += ` AND DATE(created_at) = ?`;  // Add 'created_at' condition
    }

    // Final query
    let query = `SELECT * FROM deposit_history WHERE ${condition} ORDER BY created_at DESC`;

    return { values, query };
};

export const getGameHistoryQuery = (userId, body) => {
    let { status, created_at } = body;
    let values = [userId];  // Initial values array with userId
    let condition = `user_id = ?`;  // Initial condition with userId

    // Add condition for status if provided
    if (status && status !== 'All') {
        values.push(status);  // Append the status value
        condition += ` AND game_type = ?`;  // Add 'status' condition
    }

    // Add condition for created_at if provided
    if (created_at) {
        values.push(created_at);  // Append the created_at value
        condition += ` AND DATE(created_at) = ?`;  // Add 'created_at' condition
    }

    // Final query
    let query = `SELECT * FROM bet_prediction_history WHERE ${condition} ORDER BY created_at DESC`;

    return { values, query };
};

export const getMoneyTransactionsQuery = (userId, body) => {
    let { type, created_at } = body;
    let values = [userId];  // Initial values array with userId
    let condition = `user_id = ?`;  // Initial condition with userId

    // Add condition for type if provided
    if (type && type !== 'All') {
        values.push(type);
        condition += ` AND type = ?`;  // Add 'type' condition
    }

    // Add condition for created_at if provided
    if (created_at) {
        values.push(created_at);  // Append the created_at value
        condition += ` AND DATE(created_at) = ?`;  // Add 'created_at' condition
    }

    // Final query
    let query = `SELECT * FROM user_transaction_history WHERE ${condition} ORDER BY created_at DESC`;

    return { values, query };
};

export const getGameResultListQuery = (userId, body) => {
    let { status, created_at } = body;
    let values = [];  // Initial values array with userId
    let condition = `1=1`;  // Initial condition with userId

    // Add condition for status if provided
    if (status && status !== 'All') {
        status = status.toLowerCase();
        status = status.replace(' ','_');
        values.push(status);  // Append the status value
        condition += ` AND game_type = ?`;  // Add 'status' condition
    }

    // Add condition for created_at if provided
    if (created_at) {
        values.push(created_at);  // Append the created_at value
        condition += ` AND DATE(created_at) = ?`;  // Add 'created_at' condition
    }

    // Final query
    let query = `SELECT * FROM game_result WHERE ${condition} ORDER BY game_id DESC`;

    return { values, query };
};

export const getPendingWithdrawalRequestListQuery = (userId, body) => {
    let { status, created_at } = body;
    let values = [userId, 0];  // Initial values array with userId
    let condition = `sub_admin_id = ? AND status = ?`;  // Initial condition with userId

    // Add condition for status if provided
    if (status && status !== 'All') {
        values.push(status);
        condition += ` AND user_id = ?`;
    }

    // Add condition for created_at if provided
    if (created_at) {
        values.push(created_at);  // Append the created_at value
        condition += ` AND DATE(created_at) = ?`;  // Add 'created_at' condition
    }

    // Final query
    let query = `SELECT * FROM withdrawal_history WHERE ${condition} ORDER BY created_at DESC`;

    return { values, query };
};

export const getPendingDepositRequestListQuery = (userId, body) => {
    let { status, created_at } = body;
    let values = [userId, 0];  // Initial values array with userId
    let condition = `sub_admin_id = ? AND status = ?`;  // Initial condition with userId

    // Add condition for status if provided
    if (status && status !== 'All') {
        values.push(status);
        condition += ` AND user_id = ?`;
    }

    // Add condition for created_at if provided
    if (created_at) {
        values.push(created_at);  // Append the created_at value
        condition += ` AND DATE(created_at) = ?`;  // Add 'created_at' condition
    }

    // Final query
    let query = `SELECT * FROM deposit_history WHERE ${condition} ORDER BY created_at DESC`;

    return { values, query };
};

export const getAdminPassCodeListQuery = (userId) => {
    let values = [userId];  // Initial values array with userId
    let condition = `user_id = ? AND (allot_to IS NULL OR allot_to = '')`;  // Initial condition with userId

    // Final query
    let query = `SELECT * FROM pass_code WHERE ${condition} ORDER BY created_at DESC`;

    return { values, query };
};

export const getUserByIdQuery = () => {
    return `
        SELECT
            app_user.id,
            app_user.name,
            app_user.profile_url,
            app_user.role,
            app_user.phone_number,
            app_user.wallet_balance,
            JSON_OBJECT(
                    'id', sub_admin_users.id,
                    'name', sub_admin_users.name,
                    'profile_picture', sub_admin_users.profile_url,
                    'role', sub_admin_users.role,
                    'phone_number', sub_admin_users.phone_number
            ) AS sub_admin
        FROM app_user
                 LEFT JOIN app_user AS sub_admin_users
                           ON sub_admin_users.id = app_user.sub_admin
        WHERE app_user.id = ?
    `;
};

export const getAliveUsersQuery = () => {
    return `
        SELECT
            betting_active_users.id as betting_active_users_id,
            app_user.id as id,
            app_user.game_balance as balance
        FROM betting_active_users
                 LEFT JOIN app_user ON app_user.id = betting_active_users.user_id
        WHERE betting_active_users.status = ?
        GROUP BY betting_active_users.user_id
        ORDER BY betting_active_users.created_at DESC;
    `;
};