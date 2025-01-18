import pkg from 'pg';
const { Pool } = pkg;
import dotenv  from 'dotenv';
dotenv.config();
// Database configuration
const dbConfig =
    process.env.NODE_ENV === 'PRODUCTION' ?
    {
        host: 'db.uupimsesrmizjiwvoiit.supabase.co',
        port: 5432,
        user: 'postgres', // PostgreSQL uses 'user' instead of 'username'
        password: '2!@32Ar*tHb2JQ2',
        database: 'postgres',
        max: 10, // Maximum number of connections in the pool
        idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
        connectionTimeoutMillis: 2000, // Return an error if connection takes more than 2 seconds
    }
    :
    {
        connectionString: 'postgresql://postgres:2!@32Ar*tHb2JQ2@db.uupimsesrmizjiwvoiit.supabase.co:5432/postgres',
        connectionTimeoutMillis: 5000,  // Timeout in milliseconds
        idleTimeoutMillis: 30000,       // Idle connection timeout
        query_timeout: 60000            // Query timeout
    }
// Create a pool instance
const pool = new Pool(dbConfig);

// Log pool errors
pool.on('error', (err) => {
    console.error('Unexpected error on idle client:', err);
    process.exit(-1);
});

// Export the pool instance
export default pool;
