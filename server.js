import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import session from 'express-session';
import commonRouter from './routers/commonRouter.js';

// Initialize Express app
const app = express();
const PORT = 4000;

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

// Set up the session middleware
app.use(
    session({
        secret: 'go-bet-app-session', // Use a secret key to sign the session ID cookie
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Set to true if using HTTPS
    })
);

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
