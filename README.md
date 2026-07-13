# Instagram Followers Chat

A private chat website that allows you to chat with your Instagram followers. Only people with the link can join the chat room.

## Features

- **Private Access**: Only people with the unique link can join the chat
- **Built-in Emoji Picker**: Full emoji support with categorized picker
- **Real-time Messaging**: Instant message delivery using WebSocket
- **User List**: See who's currently in the chat room
- **Typing Indicators**: See when others are typing
- **Responsive Design**: Works on mobile and desktop
- **Beautiful UI**: Modern Instagram-inspired design

## Quick Start

### Option 1: Use the Standalone HTML File

1. Open `instagram-chat.html` in your browser
2. Share the generated link with your Instagram followers
3. Start chatting!

### Option 2: Run with Node.js Server (Recommended)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Open your browser to `http://localhost:3000/chat`

4. Share the link with your Instagram followers

## How It Works

1. **Create a Room**: When you open the chat, a unique room ID is generated
2. **Share the Link**: Copy and share the link with your Instagram followers
3. **Private Access**: Only people with the link can join your chat room
4. **Chat in Real-time**: Messages appear instantly for all participants

## Customization

### Change Port

Set the `PORT` environment variable:
```bash
PORT=8080 npm start
```

### Custom WebSocket URL

In `instagram-chat.html`, change the `SOCKET_URL` variable to point to your WebSocket server.

## Deployment

### Deploy to Render (Free)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the build command to `npm install`
4. Set the start command to `node server.js`
5. Deploy!

### Deploy to Heroku

1. Create a new Heroku app
2. Connect your GitHub repository
3. Heroku will automatically detect the Node.js app
4. Deploy!

### Deploy to Vercel

1. Create a new Vercel project
2. Import your GitHub repository
3. Vercel will automatically deploy the server

## Features Breakdown

### Private Access
- Each chat room has a unique, randomly generated ID
- The link contains the room ID as a query parameter
- Only people with the exact link can join

### Built-in Emoji Support
- Categorized emoji picker (Smileys, People, Animals, Food, Travel, Activities, Objects, Symbols, Flags)
- One-click emoji insertion
- Mobile-friendly emoji picker

### Real-time Features
- WebSocket-based communication
- Instant message delivery
- Typing indicators
- User online/offline status
- User list updates

### Design
- Instagram-inspired gradient header
- Modern, clean interface
- Responsive layout for all devices
- Smooth animations and transitions

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome for Android)

## Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- WebSocket API for real-time communication
- Express.js for the server
- ws library for WebSocket support

## License

MIT License - Feel free to use, modify, and distribute.

## Screenshots

The chat interface features:
- Colorful gradient header
- Private access section with copyable link
- User list showing who's online
- Main chat area with messages
- Emoji picker at the bottom
- Typing indicators

## Tips

1. **Share Privately**: Only share the link with trusted followers
2. **Change Your Name**: Click on your name in the user list to change it
3. **Mobile Friendly**: Works great on phones - the emoji picker adapts to screen size
4. **Multiple Rooms**: Create different chat rooms for different groups

## Troubleshooting

### WebSocket Connection Issues

If you see connection errors:
1. Make sure the server is running
2. Check that the WebSocket URL in `instagram-chat.html` matches your server
3. Ensure your firewall allows WebSocket connections (port 8080 by default)

### Emoji Picker Not Showing

On some mobile browsers, the emoji picker might be hidden behind the keyboard. Try:
1. Tapping outside the input to close the keyboard
2. Then tapping the emoji button

### Messages Not Sending

1. Check your internet connection
2. Refresh the page
3. Make sure you're in the same room as other users

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## Support

For issues or questions, please open a GitHub issue.
