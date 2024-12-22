import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import session from 'express-session';
import commonRouter from './routers/commonRouter.js';
import pgSession from 'connect-pg-simple';
import pool from "./models/connection.js";

// Initialize Express app
const app = express();
const PORT = 4000;

// Define allowed origins
const allowedOrigins = [
    'http://localhost',
    'http://localhost:3000',
    'https://localhost',
    'https://localhost:3000',
    'http://192.168.1.6:3000'
];

// Configure CORS options
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error('Blocked by CORS:', origin); // Log blocked origin
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Enable cookies and other credentials
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: [
        'X-Requested-With',
        'Content-Type',
        'Authorization', // Add Authorization if tokens are used
    ],
    optionsSuccessStatus: 200, // Support for legacy browsers
};

// Use CORS middleware
app.use(cors(corsOptions));

// Middleware to parse the request body
app.use(express.urlencoded({ extended: true, limit: '250mb' }));
app.use(express.json({ limit: '250mb' }));
const pgSessionStore = pgSession(session);
// Set up the session middleware
app.use(session({
    store:  new pgSessionStore({
        pool: pool, // Use the imported pool connection
        tableName: 'sessions' // Name of the table storing session data
    }),
    secret: 'get-bet-session-store',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set true if using HTTPS
        maxAge: 3600000 // 1 hour
    }
}));

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
app.use('/api-call/common', commonRouter);

// Basic route
app.get('/', (req, res) => {
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
