// Load module
import mysql from 'mysql'
// Initialize pool
var pool = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'getbet',
    password: '2!@32Ar*tHb2JQ2',
    database: 'admin_getbet',
    debug    :  false
});
export default pool;