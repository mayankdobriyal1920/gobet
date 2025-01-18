export const loginUserQuery = () => {
    return `
        SELECT
            app_user.id,
            app_user.name,
            app_user.profile_url,
            app_user.role,
            app_user.phone_number,
            app_user.wallet_balance,
            jsonb_build_object(
                    'id', sub_admin_users.id,
                    'name', sub_admin_users.name,
                    'profile_picture', sub_admin_users.profile_url,
                    'role', sub_admin_users.role,
                    'phone_number', sub_admin_users.phone_number
            ) AS sub_admin
        FROM app_user
                 LEFT JOIN app_user AS sub_admin_users
                           ON sub_admin_users.id = app_user.sub_admin
        WHERE app_user.phone_number = $1;
    `;
};

export const userProfileDataQuery = () => {
    return `
        SELECT
            app_user.id,
            app_user.name,
            app_user.profile_url,
            app_user.role,
            app_user.phone_number,
            app_user.wallet_balance,
            jsonb_build_object(
                    'id', sub_admin_users.id,
                    'name', sub_admin_users.name,
                    'profile_picture', sub_admin_users.profile_url,
                    'role', sub_admin_users.role,
                    'phone_number', sub_admin_users.phone_number
            ) AS sub_admin
        FROM app_user
                 LEFT JOIN app_user AS sub_admin_users
                           ON sub_admin_users.id = app_user.sub_admin
        WHERE app_user.id = $1;
    `;
};

export const CheckMobNumberAlreadyExistQuery = () => {
    return `
        SELECT
            app_user.id,
            app_user.name
        FROM app_user
        WHERE app_user.phone_number = $1;
    `;
};

export const isPassCodeValidQuery = () => {
    return `
        SELECT
            pass_code.id,
            pass_code.user_id,
            pass_code.code
        FROM pass_code
        WHERE pass_code.allot_to is null and pass_code.code = $1;
    `;
};

export const signupQuery = () => {
    return `INSERT INTO app_user(id,name,phone_number,profile_url,sub_admin,wallet_balance,role,created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
};

export const updatePassCodeQuery = () => {
    return `
        UPDATE pass_code set allot_to = $1
        WHERE id = $2;
    `;
};

export const updateUserAvatarQuery = () => {
    return `
        UPDATE app_user set profile_url = $1
        WHERE id = $2;
    `;
};

export const updateUserUserNameQuery = () => {
    return `
        UPDATE app_user set name = $1
        WHERE id = $2;
    `;
};

export const getWithdrawalHistoryQuery = (userId, body) => {
    let { status, created_at } = body;
    let values = [userId];  // Initial values array with userId
    let condition = `user_id = $1`;  // Initial condition with userId

    // Add condition for status if provided
    if (status && status !== 'All') {
        values.push(status === 'Pending' ? 0 : 1);  // Append the status value (1 for 'Pending', 0 otherwise)
        condition += ` AND status = $${values.length}`;  // Add 'status' condition
    }

    // Add condition for created_at if provided
    if (created_at) {
        values.push(created_at);  // Append the created_at value
        condition += ` AND DATE(created_at) = $${values.length}`;  // Add 'created_at' condition
    }

    // Final query
    let query = `SELECT * FROM withdrawal_history WHERE ${condition}`;

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
            jsonb_build_object(
                    'id', sub_admin_users.id,
                    'name', sub_admin_users.name,
                    'profile_picture', sub_admin_users.profile_url,
                    'role', sub_admin_users.role,
                    'phone_number', sub_admin_users.phone_number
            ) AS sub_admin
        FROM app_user
                 LEFT JOIN app_user AS sub_admin_users
                           ON sub_admin_users.id = app_user.sub_admin
        WHERE app_user.id = $1;
    `;
};

export const getAliveUsersQuery = () => {
    return `SELECT DISTINCT ON (betting_active_users.user_id)
            betting_active_users.id as betting_active_users_id,
            app_user.id as id,
            app_user.game_balance as balance
            FROM betting_active_users
            LEFT JOIN app_user ON app_user.id = betting_active_users.user_id
        WHERE betting_active_users.status = $1
        ORDER BY betting_active_users.user_id, betting_active_users.created_at DESC`;
};

