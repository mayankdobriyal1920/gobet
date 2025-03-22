export const loginUserQuery = () => {
    return `
        SELECT
            app_user.id,
            app_user.name,
            app_user.profile_url,
            app_user.role,
            app_user.uid,
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
            pass_code.role,
            pass_code.code
        FROM pass_code
        WHERE pass_code.allot_to IS NULL AND pass_code.code = ?;
    `;
};

export const actionToGetNearestGameSessionOrActiveSessionAndGamePlatformQuery = () => {
    return `
        SELECT
            bgs.id,
            bgs.start_time,
            bgs.end_time,
            bgs.betting_platform_id,
            bp.name AS betting_platform_name,
            bgs.is_active
        FROM
            betting_game_session bgs
                INNER JOIN betting_platform bp ON bgs.betting_platform_id = bp.id
        WHERE
            bgs.start_time <= NOW()
          AND bgs.end_time >= NOW()
        ORDER BY
            bgs.start_time
            LIMIT 1;

    `;
};

export const actionToGetGameSessionOrAllSessionAndGamePlatformQuery = () => {
    return `
        SELECT
            bgs.id,
            bgs.start_time,
            bgs.end_time,
            bgs.game_type,
            bgs.is_active,
            bp.name AS betting_platform_name,
            bgs.betting_platform_id
        FROM
            betting_game_session bgs
                INNER JOIN betting_platform bp ON bp.id = bgs.betting_platform_id
        WHERE
            CONVERT_TZ(bgs.end_time, 'UTC', 'Asia/Kolkata') < NOW()  -- Adjust if needed
        ORDER BY
            bgs.start_time DESC;


    `;
};

export const signupQuery = () => {
    return `INSERT INTO app_user(id, name,uid, phone_number, profile_url, sub_admin, wallet_balance, role) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
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

export const getGameHistoryQuery = (userId, role, body) => {
    let { status, created_at } = body;
    let values = [userId];
    let condition = `bph.user_id = ?`;

    if (role === 1) {
        values = [];
        condition = `true`;
    }

    // Add condition for status if provided
    if (status && status !== 'All') {
        values.push(status);
        condition += ` AND bph.game_type = ?`;
    }

    // Add condition for created_at if provided
    if (created_at) {
        values.push(created_at);
        condition += ` AND DATE(bph.created_at) = ?`;
    }

    // Final query with JSON_OBJECT for user data
    let query = `
        SELECT
            bph.id,
            bph.amount,
            bph.user_id,
            bph.bet_id,
            bph.created_at,
            bph.option_name,
            bph.game_type,
            bph.min,
            bph.status,
            bph.betting_active_users_id,
            bph.game_result_id,
            bph.win_status,
            JSON_OBJECT(
                    'id', au.id,
                    'name', au.name,
                    'uid', au.uid
            ) AS user_data
        FROM bet_prediction_history bph
                 INNER JOIN app_user au ON bph.user_id = au.id
        WHERE ${condition}
        ORDER BY bph.created_at DESC
    `;

    return { values, query };
};

export const actionToGetAllUsersSubscriptionsDataQuery = (body) => {
    let { status, created_at } = body;
    let values = [];
    let condition = `true`;

    // Add condition for status (is_active) if provided
    if (status !== undefined && status !== 2) {
        values.push(status);
        condition += ` AND us.is_active = ?`;
    }

    // Add condition for created_at if provided
    if (created_at) {
        values.push(created_at);
        condition += ` AND DATE(us.created_at) = ?`;
    }

    // Final query with JSON_OBJECT for user and subscription data
    let query = `
        SELECT
            us.id,
            us.subscription_id,
            us.plan_type,
            us.total_value,
            us.balance,
            us.created_by,
            us.created_at,
            us.expiry_date,
            us.is_active,
            JSON_OBJECT(
                    'id', s.id,
                    'name', s.name,
                    'price', s.price,
                    'duration_days', s.duration_days,
                    'value', s.value
            ) AS subscription_data,
            JSON_OBJECT(
                    'id', au.id,
                    'name', au.name,
                    'uid', au.uid
            ) AS user_data
        FROM user_subscriptions us
                 INNER JOIN subscriptions s ON us.subscription_id = s.id
                 INNER JOIN app_user au ON us.created_by = au.id
        WHERE ${condition}
        ORDER BY us.created_at DESC
    `;

    return { values, query };
};



export const getMoneyTransactionsQuery = (userId, role, body) => {
    let { type, created_at } = body;
    let values = [userId];
    let condition = `uth.user_id = ?`;

    if (role === 1) {
        values = [];
        condition = `true`;
    }

    // Add condition for type if provided
    if (type && type !== 'All') {
        values.push(type);
        condition += ` AND uth.type = ?`;
    }

    // Add condition for created_at if provided
    if (created_at) {
        values.push(created_at);
        condition += ` AND DATE(uth.created_at) = ?`;
    }

    // Final query with JSON_OBJECT for user data
    let query = `
        SELECT
            uth.id,
            uth.amount,
            uth.user_id,
            uth.type,
            uth.created_at,
            JSON_OBJECT(
                    'id', au.id,
                    'name', au.name,
                    'uid', au.uid
            ) AS user_data
        FROM user_transaction_history uth
                 INNER JOIN app_user au ON uth.user_id = au.id
        WHERE ${condition}
        ORDER BY uth.created_at DESC
    `;

    return { values, query };
};


export const getGameResultListQuery = (userId, body) => {
    let { status, created_at,session_id } = body;
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

    if (session_id) {
        values.push(session_id);  // Append the created_at value
        condition += ` AND betting_game_session_id = ?`;  // Add 'created_at' condition
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

export const getAdminPassCodeListQuery = (userId,isAdminPasscodePage) => {
    if(isAdminPasscodePage) {
        let values = [1];  // Initial values array with userId
        let condition = `role = ? AND (allot_to IS NULL OR allot_to = '')`;  // Initial condition with userId
        // Final query
        let query = `SELECT *
                     FROM pass_code
                     WHERE ${condition}
                     ORDER BY created_at DESC`;
        return {values, query};
    }else{
        let values = [userId];  // Initial values array with userId
        let condition = `user_id = ? AND (allot_to IS NULL OR allot_to = '')`;  // Initial condition with userId

        // Final query
        let query = `SELECT *
                     FROM pass_code
                     WHERE ${condition}
                     ORDER BY created_at DESC`;

        return {values, query};
    }
};

export const getUserByIdQuery = () => {
    return `
        SELECT
            app_user.id,
            app_user.name,
            app_user.profile_url,
            app_user.uid,
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
            ba.id AS betting_active_users_id,
            au.id AS id,
            au.name AS name,
            au.phone_number AS uid,
            au.is_test_user AS is_test_user,
            au.betting_balance AS balance,
            us.id AS subscription_id,
            us.plan_type AS plan_type,
            us.total_value AS total_value,
            us.balance AS subscription_balance,
            us.expiry_date AS subscription_expiry_date
        FROM betting_active_users AS ba
                 LEFT JOIN app_user AS au ON au.id = ba.user_id
                 LEFT JOIN user_subscriptions AS us ON us.id = (
            SELECT id FROM user_subscriptions
            WHERE created_by = au.id
              AND is_active = 1
              AND betting_balance >= 10
              AND expiry_date > CURRENT_TIMESTAMP
            ORDER BY created_at DESC LIMIT 1  -- Fetch latest active subscription
            )
        WHERE ba.status = ?
          AND au.betting_balance >= 10
        ORDER BY ba.created_at DESC;
        ;
    `;
};