// Instagram Followers Chat Server
// Run with: node server.js

const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Store rooms and their users
const rooms = new Map();

// Serve static files
app.use(express.static(path.join(__dirname)));

// Route for the chat page
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'instagram-chat.html'));
});

// Route for the main page (redirect to chat)
app.get('/', (req, res) => {
    res.redirect('/chat');
});

// WebSocket connection handler
wss.on('connection', (ws) => {
    console.log('New client connected');
    
    let currentRoom = null;
    let currentUser = null;
    
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            
            switch (data.type) {
                case 'join':
                    handleJoin(ws, data);
                    currentRoom = data.room;
                    currentUser = data.user;
                    break;
                case 'message':
                    handleMessage(ws, data);
                    break;
                case 'typing':
                    handleTyping(ws, data);
                    break;
                case 'leave':
                    handleLeave(ws, data);
                    break;
                case 'status':
                    handleStatus(ws, data);
                    break;
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });
    
    ws.on('close', () => {
        if (currentRoom && currentUser) {
            handleLeave(ws, { room: currentRoom, user: currentUser });
        }
        console.log('Client disconnected');
    });
});

function handleJoin(ws, data) {
    const { room, user } = data;
    
    // Initialize room if it doesn't exist
    if (!rooms.has(room)) {
        rooms.set(room, {
            users: new Map(),
            messages: []
        });
    }
    
    const roomData = rooms.get(room);
    
    // Add user to room
    roomData.users.set(user.id, {
        ...user,
        online: true,
        isTyping: false,
        ws: ws
    });
    
    // Send user list to all in room
    broadcastToRoom(room, {
        type: 'userList',
        users: Array.from(roomData.users.values()).map(u => ({
            id: u.id,
            name: u.name,
            color: u.color,
            online: u.online
        }))
    });
    
    // Send previous messages to new user
    if (roomData.messages.length > 0) {
        ws.send(JSON.stringify({
            type: 'history',
            messages: roomData.messages
        }));
    }
    
    // Notify room about new user
    broadcastToRoom(room, {
        type: 'system',
        message: `${user.name} joined the chat`
    }, ws);
    
    console.log(`User ${user.name} joined room ${room}`);
}

function handleMessage(ws, data) {
    const { room, user, text, timestamp } = data;
    
    if (!rooms.has(room)) return;
    
    const roomData = rooms.get(room);
    
    // Store message
    const message = {
        user: user,
        text: text,
        timestamp: timestamp || new Date().toISOString()
    };
    
    roomData.messages.push(message);
    
    // Keep only last 100 messages
    if (roomData.messages.length > 100) {
        roomData.messages.shift();
    }
    
    // Broadcast to all in room
    broadcastToRoom(room, {
        type: 'message',
        message: message
    });
    
    console.log(`Message from ${user.name} in room ${room}: ${text}`);
}

function handleTyping(ws, data) {
    const { room, user, isTyping } = data;
    
    if (!rooms.has(room)) return;
    
    const roomData = rooms.get(room);
    
    if (roomData.users.has(user.id)) {
        roomData.users.get(user.id).isTyping = isTyping;
        
        // Find who is typing
        const typingUsers = Array.from(roomData.users.values())
            .filter(u => u.isTyping && u.id !== user.id);
        
        if (typingUsers.length > 0) {
            // Send typing indicator for the first typing user
            const typingUser = typingUsers[0];
            broadcastToRoom(room, {
                type: 'typing',
                user: { id: typingUser.id, name: typingUser.name },
                isTyping: true
            }, ws);
        } else {
            // No one is typing
            broadcastToRoom(room, {
                type: 'typing',
                user: { id: user.id, name: user.name },
                isTyping: false
            }, ws);
        }
    }
}

function handleLeave(ws, data) {
    const { room, user } = data;
    
    if (!rooms.has(room)) return;
    
    const roomData = rooms.get(room);
    
    if (roomData.users.has(user.id)) {
        roomData.users.delete(user.id);
        
        // Send updated user list
        broadcastToRoom(room, {
            type: 'userList',
            users: Array.from(roomData.users.values()).map(u => ({
                id: u.id,
                name: u.name,
                color: u.color,
                online: u.online
            }))
        });
        
        // Notify room
        broadcastToRoom(room, {
            type: 'system',
            message: `${user.name} left the chat`
        });
        
        console.log(`User ${user.name} left room ${room}`);
        
        // Clean up empty rooms
        if (roomData.users.size === 0) {
            rooms.delete(room);
        }
    }
}

function handleStatus(ws, data) {
    const { room, user, online } = data;
    
    if (!rooms.has(room)) return;
    
    const roomData = rooms.get(room);
    
    if (roomData.users.has(user.id)) {
        roomData.users.get(user.id).online = online;
        
        // Send updated user list
        broadcastToRoom(room, {
            type: 'userList',
            users: Array.from(roomData.users.values()).map(u => ({
                id: u.id,
                name: u.name,
                color: u.color,
                online: u.online
            }))
        });
    }
}

function broadcastToRoom(room, message, excludeWs = null) {
    if (!rooms.has(room)) return;
    
    const roomData = rooms.get(room);
    const messageStr = JSON.stringify(message);
    
    roomData.users.forEach(user => {
        if (user.ws && user.ws !== excludeWs && user.ws.readyState === WebSocket.OPEN) {
            user.ws.send(messageStr);
        }
    });
}

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Chat available at http://localhost:${PORT}/chat`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    
    // Close all WebSocket connections
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.close(1001, 'Server is shutting down');
        }
    });
    
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
