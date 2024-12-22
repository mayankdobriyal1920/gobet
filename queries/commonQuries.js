export const loginUserQuery = () => {
    return `
        SELECT
            app_user.id,
            app_user.name,
            app_user.profile_picture,
            app_user.role,
            app_user.phone_number,
            jsonb_build_object(
                    'id', sub_admin_users.id,
                    'name', sub_admin_users.name,
                    'profile_picture', sub_admin_users.profile_picture,
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
