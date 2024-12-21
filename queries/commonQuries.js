export const loginUserQuery = (password)=>{
    return `SELECT app_user.id as id,
                   app_user.name as name,
                   app_user.email as email,
                   app_user.is_active as is_active,
                   app_user.role as role,
                   app_user.avatar as avatar,
                   app_user.school_class_with_section_id,
                   school_class_with_section.class_standard_id,
                   app_user.gender,
                   app_user.mobile,
                   app_user.address,
                   app_user.school_id as school_id,
                   app_user.dob,
                   app_user.syllabus_type AS syllabus_type_id,
                   school_users.syllabus_type as school_syllabus_id
            FROM app_user
                     LEFT JOIN app_user as school_users ON school_users.id = app_user.school_id
                     LEFT JOIN school_class_with_section ON school_class_with_section.id = app_user.school_class_with_section_id
            WHERE app_user.panel_password = '${password}' AND app_user.is_active = 1`;
}