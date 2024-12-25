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
        WHERE app_user.phone_number = $1
          AND app_user.otp = $2;
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

