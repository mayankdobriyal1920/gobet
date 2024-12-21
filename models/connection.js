import mysql from 'mysql2';
import {Client} from 'ssh2';
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import genericPool from 'generic-pool';

// SSH configuration
const sshConfig = {
    host: process.env.DATABASE_SSH_HOST,
    port: 22,
    username: process.env.DATABASE_SSH_USER,
    password: process.env.DATABASE_SSH_PASSWORD,
    debug: false
};

// MySQL database configuration
const dbConfig = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DEVELOPMENT_NAME,
    debug: false
};

// Create an SSH tunnel to the MySQL server
export function createTunnel(){
    return new Promise((resolve, reject) => {
        const sshClient = new Client();
        sshClient.on('ready', () => {
            sshClient.forwardOut(
                '127.0.0.1', // MySQL host within the server
                3306, // MySQL port within the server
                process.env.DATABASE_HOST,
                3306, // Local port for forwarding
                (err, stream) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    const pools = createPool(stream);
                    resolve(pools);
                }
            );
        });
        sshClient.connect(sshConfig);
    });
}

// Create a MySQL connection pools
function createPool(stream) {
    const factory = {
        create: () => {
            const connection = mysql.createConnection({ ...dbConfig,debug    :  false, stream });
            return new Promise((resolve, reject) => {
                connection.connect((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(connection);
                    }
                });
            });
        },
        destroy: (connection) => {
            connection.end();
        },
    };

    return genericPool.createPool(factory);
}
async function createPoolConnection(param){
    return  mysql.createPool({
        connectionLimit : 10,
        host     : param.host,
        user     : param.user,
        password : param.password,
        database : param.database,
        debug    :  false
    });
}
export default async function connectPool(){
    if(process.env.NODE_ENV=='PRODUCTION'){
        return await createPoolConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password : process.env.DATABASE_PASSWORD,
            database : process.env.DATABASE_PRODUCTION_NAME,
            debug    :  false
        });
    }else if(process.env.NODE_ENV=='LOCAL'){
        return await createPoolConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'shikshak_solution',
            debug    :  false
        });
    }else{
        const pool = await createTunnel();
        return await pool.acquire();
    }

}
