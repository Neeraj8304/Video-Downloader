# Global Music - Spotify-like Streaming & Download

A complete music streaming and download website inspired by Spotify, featuring millions of songs from around the world with a beautiful, responsive interface.

## Features

### 🎵 Music Streaming
- **High-quality audio playback** with progress bar and controls
- **Play/Pause, Next, Previous** navigation
- **Shuffle and Repeat** modes
- **Volume control** with mute toggle
- **Progress tracking** with seek functionality

### 📥 Download Functionality
- **One-click download** for any song
- **Download current playing song** directly from player
- **Simulated download** for demo purposes (works with real audio files)

### 🎶 Music Library
- **20+ sample songs** from various genres and artists
- **8 featured playlists** (Today's Top Hits, Discover Weekly, Release Radar, etc.)
- **12 music genres** (Pop, Hip-Hop, R&B, Rock, Electronic, Jazz, etc.)
- **Top Charts** with popularity-based ranking
- **New Releases** section for latest tracks

### 🔍 Search & Discovery
- **Real-time search** across songs, artists, albums, and playlists
- **Filtered search results** with tabs for different categories
- **Artist and album browsing**
- **Genre filtering** for easy discovery

### 👤 User Features
- **Create custom playlists** with names and descriptions
- **Like/Unlike songs** with persistent storage
- **Recently played** history tracking
- **User library** for managing playlists and liked songs

### 💡 Additional Features
- **Queue system** with drag-and-drop support
- **Context menus** for right-click actions
- **Responsive design** for mobile, tablet, and desktop
- **Keyboard shortcuts** (Space for play/pause, Arrow keys for navigation)
- **Toast notifications** for user feedback
- **Beautiful UI** with Spotify-inspired design

## Quick Start

### Option 1: Open Directly in Browser
Simply open `music/index.html` in your web browser. No server required!

### Option 2: Run with a Local Server
For the best experience, run a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (install http-server first)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000/music/` in your browser.

## Project Structure

```
music/
├── index.html          # Main HTML file
├── styles.css          # All styles and CSS
├── data.js             # Sample data (songs, playlists, genres)
├── app.js              # Main application logic
└── README.md           # This file
```

## How It Works

### Data Storage
- **Local Storage**: User preferences, liked songs, playlists, and recently played songs are stored in the browser's localStorage
- **Sample Data**: Comes with 20 songs, 8 playlists, and 12 genres pre-loaded

### Audio Playback
- Uses the HTML5 `<audio>` element for playback
- Supports MP3 format (can be extended to other formats)
- Progress tracking and seeking functionality

### Download Feature
- Creates download links for songs
- Simulates download process with notifications
- In a production environment, you would connect to a backend API for actual file downloads

## Customization

### Adding More Songs
Edit `data.js` and add more entries to the `songs` array:

```javascript
{
    id: 21,
    title: "Your Song Title",
    artist: "Artist Name",
    album: "Album Name",
    duration: "3:30",
    cover: "https://example.com/cover.jpg",
    url: "https://example.com/song.mp3",
    genre: "Pop",
    popularity: 80,
    year: 2023
}
```

### Adding More Playlists
Edit `data.js` and add to the `playlists` array:

```javascript
{
    id: 9,
    title: "My Custom Playlist",
    description: "My favorite songs",
    creator: "Your Name",
    cover: "https://example.com/cover.jpg",
    songs: [1, 2, 3, 4, 5],  // Array of song IDs
    color: "#1DB954"
}
```

### Changing Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --primary: #1DB954;        /* Spotify green */
    --secondary: #191414;      /* Dark background */
    --text: #ffffff;          /* Text color */
    --card-bg: #282828;       /* Card background */
    /* ... more variables */
}
```

## Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome for Android)

## Technologies Used

- **HTML5** for structure
- **CSS3** for styling (Flexbox, Grid, Animations)
- **JavaScript (ES6+)** for functionality
- **Font Awesome** for icons
- **Google Fonts** for typography
- **Local Storage** for data persistence

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Space | Play/Pause |
| → (Right Arrow) | Next Song |
| ← (Left Arrow) | Previous Song |

## Future Enhancements

Here are some features you could add:

1. **User Authentication** - Add login/signup functionality
2. **Real Backend** - Connect to a Node.js/Express server for data persistence
3. **Social Features** - Share playlists with friends
4. **Offline Mode** - Cache songs for offline listening
5. **Equalizer** - Add audio equalizer settings
6. **Lyrics Display** - Show song lyrics
7. **Music Videos** - Add video playback support
8. **Collaborative Playlists** - Allow multiple users to edit playlists
9. **Radio Stations** - Add live radio streaming
10. **Podcasts** - Add podcast support

## API Integration

To make this a production-ready app, you could integrate with:

- **Spotify API** - For real music data
- **YouTube API** - For music videos
- **SoundCloud API** - For independent artists
- **Last.fm API** - For music recommendations

## Deployment

### Deploy to Netlify
1. Create a new site on Netlify
2. Drag and drop the `music` folder
3. Your site will be live!

### Deploy to Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` in the `music` directory
3. Follow the prompts

### Deploy to GitHub Pages
1. Push the `music` folder to a GitHub repository
2. Go to Settings > Pages
3. Select the branch and folder
4. Your site will be live at `https://username.github.io/repo/music/`

## Troubleshooting

### Audio Not Playing
- Make sure the audio file URLs are correct
- Check if the browser supports the audio format
- Try a different browser

### Download Not Working
- The download feature is simulated for demo purposes
- For real downloads, you need a backend server
- Check browser permissions for downloads

### UI Issues
- Make sure all CSS files are loaded correctly
- Check for JavaScript errors in the console
- Try clearing browser cache

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## License

MIT License - Feel free to use, modify, and distribute.

## Support

For issues or questions, please open a GitHub issue.

---

**Enjoy your music! 🎶**
