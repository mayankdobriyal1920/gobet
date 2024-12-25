import pkg from 'pg';
const { Pool } = pkg;

// Database configuration
// const dbConfig = {
//     host: 'dpg-ctjrh70gph6c738ildn0-a',
//     port: 5432,
//     user: 'getbet', // PostgreSQL uses 'user' instead of 'username'
//     password: 'RHaMdjZVq1vfoK5XxgGjVwAJGlGiZPZw',
//     database: 'getbet',
//     max: 10, // Maximum number of connections in the pool
//     idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
//     connectionTimeoutMillis: 2000, // Return an error if connection takes more than 2 seconds
// };

const dbConfig = {
    connectionString: 'postgres://getbet:RHaMdjZVq1vfoK5XxgGjVwAJGlGiZPZw@dpg-ctjrh70gph6c738ildn0-a.oregon-postgres.render.com:5432/getbet?sslmode=require',
    connectionTimeoutMillis: 5000,  // Timeout in milliseconds
    idleTimeoutMillis: 30000,       // Idle connection timeout
    query_timeout: 60000            // Query timeout
};

// Create a pool instance
const pool = new Pool(dbConfig);

// Log pool errors
pool.on('error', (err) => {
    console.error('Unexpected error on idle client:', err);
    process.exit(-1);
});

// Export the pool instance
export default pool;
