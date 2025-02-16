// Load module
import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
// Initialize pool
var pool = mysql.createPool({
    connectionLimit : 10,
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'getbet',
    password: process.env.DB_PASSWORD || 'your_default_password',
    database: process.env.DB_NAME || 'admin_getbet',
    debug    :  false
});
export default pool;