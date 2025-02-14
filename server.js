import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import session from 'express-session';
import commonRouter from './routers/commonRouter.js';
import pgSession from 'connect-pg-simple';
import pool from "./models/connection.js";
import EventEmitter from 'events';
import dotenv  from 'dotenv';
dotenv.config();

// Initialize Express app
const app = express();
const PORT = 4003;

// Define allowed origins
const allowedOrigins = [
    'http://localhost',
    'http://localhost:3000',
    'https://localhost',
    'https://localhost:3000',
    'http://192.168.1.6:3000'
];

// Middleware to parse the request body
app.use(express.urlencoded({ extended: true, limit: '250mb' }));
app.use(express.json({ limit: '250mb' }));
const PgSessionStore = pgSession(session);

///////// ADDING SESSION POOL FOR USER SESSION /////////////////
EventEmitter.defaultMaxListeners = 0;
const UserDataSessionPgStore = new PgSessionStore({
    pool: pool, ///// Use the pool you created /////
    tableName: 'sessions', //// Your table for storing sessions /////
});
UserDataSessionPgStore.setMaxListeners(0);
///////// ADDING SESSION POOL FOR USER SESSION /////////////////

//This is the middleware function which will be called before any routes get hit which are defined after this point, i.e. in your index.js
app.use(function (req, res, next) {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin); // Allow only specific origins
    } else {
        res.setHeader('Access-Control-Allow-Origin', '*'); // Block other origins
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); // No Content
    }
    next();
});

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Check if the origin is in the allowedOrigins array
        if (allowedOrigins.includes(origin)) {
            return callback(null, true); // Origin is allowed and can send credentials
        } else {
            // For other origins, allow access without credentials
            return callback(null, '*'); // Allow all other origins without credentials
        }
    },
    credentials: true, // Allow cookies to be sent for allowed origins only
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE', // Allowed methods
    allowedHeaders: 'X-Requested-With, content-type, Accept' // Allowed headers
}));

app.set('trust proxy', 1);
app.use((req, res, next) => {
    // Check for an existing session
    if (req?.session && req?.session?.userSessionData) {
        // If a session already exists, simply proceed to the next middleware
        return next();
    }
    session({
        store: UserDataSessionPgStore,
        secret: 'get-bet-session-store',
        resave: false,
        saveUninitialized: false,
        name: 'get-bet-mobile-app-session',  // Use dynamic session name
        cookie: {
            expires: new Date(Date.now() + 31536000000),  // 1 year expiration
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'PRODUCTION' ? 'none' :'lax',
            secure: process.env.NODE_ENV === 'PRODUCTION',  // Ensure HTTPS for secure cookies
            maxAge: 31536000000  // 1 year max age
        }
    })(req,res,next) // Call the next middleware
});

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: '*', // Allow all origins (adjust for security in production)
        methods: ['GET', 'POST'],
    },
});

// Routes
app.use('/api-get-bet/common', commonRouter);

// Basic route
app.get('/api-get-bet/', (req, res) => {
    res.send('Server is running!');
});

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen to events
    socket.on('message', (data) => {
        console.log('Message received:', data);
        // Broadcast message to all connected clients
        io.emit('message', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
