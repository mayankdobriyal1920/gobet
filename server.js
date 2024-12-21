import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import session from 'express-session';
import commonRouter from './routers/commonRouter.js';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';

// Initialize Express app
const app = express();
const PORT = 4000;

// Create a Redis client
const redisClient = createClient();

redisClient.connect().catch(console.error);
redisClient.on('error', (err) => console.error('Redis connection error:', err));

// Create a Redis store instance
const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'sess:', // Optional: Add a prefix to all session keys in Redis
});

// Set up session middleware
app.use(
    session({
        store: redisStore,
        secret: 'get-bet-app-session', // Replace with a strong secret
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // Set to true if your app is running on HTTPS
            httpOnly: true,
            sameSite: 'lax', // Adjust based on your application's needs
        },
    })
);


// Configure CORS options
const corsOptions = {
    origin: 'http://localhost:3000',  // Allow all origins (adjust for security in production)
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['X-Requested-With', 'Content-Type'],
    credentials: true,  // Allow cookies to be sent with the request
};

// Use CORS middleware with the defined options
app.use(cors(corsOptions));

// Middleware to parse the request body
app.use(express.urlencoded({ extended: true, limit: '250mb' }));
app.use(express.json({ limit: '250mb' }));

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
