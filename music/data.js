// Sample Data for Global Music App

// Songs Data
const songs = [
    {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: "3:20",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        genre: "Pop",
        popularity: 95,
        year: 2019
    },
    {
        id: 2,
        title: "Save Your Tears",
        artist: "The Weeknd, Ariana Grande",
        album: "After Hours",
        duration: "3:35",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        genre: "Pop",
        popularity: 92,
        year: 2021
    },
    {
        id: 3,
        title: "Stay",
        artist: "The Kid LAROI, Justin Bieber",
        album: "F*ck Love 3: Over You",
        duration: "2:21",
        cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&h=200&fit=crop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        genre: "Pop",
        popularity: 90,
        year: 2021
    },
    {
        id: 4,
        title: "Good 4 U",
        artist: "Olivia Rodrigo",
        album: "SOUR",
        duration: "2:58",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        genre: "Pop",
        popularity: 88,
        year: 2021
    },
    {
        id: 5,
        title: "Levitating",
        artist: "Dua Lipa, DaBaby",
        album: "Future Nostalgia",
        duration: "3:23",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        genre: "Pop",
        popularity: 85,
        year: 2020
    },
    {
        id: 6,
        title: "Montero (Call Me by Your Name)",
        artist: "Lil Nas X",
        album: "Montero",
        duration: "2:17",
        cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&h=200&fit=crop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        genre: "Hip-Hop",
        popularity: 82,
        year: 2021
    },
    {
        id: 7,
        title: "Peaches",
        artist: "Justin Bieber, Daniel Caesar, Giveon",
        album: "Justice",
        duration: "3:18",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        genre: "R&B",
        popularity: 80,
        year: 2021
    },
    {
        id: 8,
        title: "Kiss Me More",
        artist: "Doja Cat, SZA",
        album: "Planet Her",
        duration: "3:28",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        genre: "Pop",
        popularity: 78,
        year: 2021
    },
    {
        id: 9,
        title: "Deja Vu",
        artist: "Olivia Rodrigo",
        album: "SOUR",
        duration: "2:35",
        cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&h=200&fit=crop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        genre: "Pop",
        popularity: 75,
        year: 2021
    },
    {
        id: 10,
        title: "Heartbreak Anniversary",
        artist: "Giveon",
        album: "When It's All Said and Done... Take Time",
        duration: "3:18",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        genre: "R&B",
        popularity: 72,
        year: 2020
    },
    {
        id: 11,
        title: "Leave The Door Open",
        artist: "Silk Sonic",
        album: "An Evening with Silk Sonic",
        duration: "4:02",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
        genre: "R&B",
        popularity: 90,
        year: 2021
    },
    {
        id: 12,
        title: "Butter",
        artist: "BTS",
        album: "Butter",
        duration: "2:42",
        cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&h=200&fit=crop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
        genre: "K-Pop",
        popularity: 88,
        year: 2021
    },
    {
        id: 13,
        title: "Permission to Dance",
        artist: "BTS",
        album: "Permission to Dance",
        duration: "3:07",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
        genre: "K-Pop",
        popularity: 85,
        year: 2021
    },
    {
        id: 14,
        title: "Industry Baby",
        artist: "Lil Nas X, Jack Harlow",
        album: "Montero",
        duration: "3:32",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
        genre: "Hip-Hop",
        popularity: 80,
        year: 2021
    },
    {
        id: 15,
        title: "Need To Know",
        artist: "Doja Cat",
        album: "Planet Her",
        duration: "2:47",
        cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&h=200&fit=crop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
        genre: "Pop",
        popularity: 75,
        year: 2021
    },
    {
        id: 16,
        title: "Bad Habits",
        artist: "Ed Sheeran",
        album: "=",
        duration: "3:51",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
        genre: "Pop",
        popularity: 85,
        year: 2021
    },
    {
        id: 17,
        title: "Cold Heart",
        artist: "Elton John, Dua Lipa",
        album: "The Lockdown Sessions",
        duration: "3:22",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3",
        genre: "Pop",
        popularity: 82,
        year: 2021
    },
    {
        id: 18,
        title: "Shivers",
        artist: "Ed Sheeran",
        album: "=",
        duration: "3:27",
        cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&h=200&fit=crop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3",
        genre: "Pop",
        popularity: 80,
        year: 2021
    },
    {
        id: 19,
        title: "Happier Than Ever",
        artist: "Billie Eilish",
        album: "Happier Than Ever",
        duration: "4:58",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3",
        genre: "Pop",
        popularity: 78,
        year: 2021
    },
    {
        id: 20,
        title: "Stay (Kid Cudi Version)",
        artist: "The Kid LAROI, Justin Bieber, Kid Cudi",
        album: "F*ck Love 3: Over You",
        duration: "2:21",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3",
        genre: "Pop",
        popularity: 75,
        year: 2021
    }
];

// Playlists Data
const playlists = [
    {
        id: 1,
        title: "Today's Top Hits",
        description: "The biggest hits right now, updated daily.",
        creator: "Global Music",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        songs: [1, 2, 3, 4, 5],
        color: "#1DB954"
    },
    {
        id: 2,
        title: "Discover Weekly",
        description: "Your weekly mixtape. Enjoy new music.",
        creator: "Global Music",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
        songs: [6, 7, 8, 9, 10],
        color: "#833ab4"
    },
    {
        id: 3,
        title: "Release Radar",
        description: "Catch all the latest music from artists you follow.",
        creator: "Global Music",
        cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop",
        songs: [11, 12, 13, 14, 15],
        color: "#c13584"
    },
    {
        id: 4,
        title: "Chill Vibes",
        description: "Relax and unwind with these chill tracks.",
        creator: "Global Music",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        songs: [1, 6, 11, 3, 8],
        color: "#2d46b9"
    },
    {
        id: 5,
        title: "Workout Mix",
        description: "High-energy tracks to power your workout.",
        creator: "Global Music",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
        songs: [2, 7, 12, 4, 9],
        color: "#fd1d1d"
    },
    {
        id: 6,
        title: "Party Hits",
        description: "Get the party started with these bangers.",
        creator: "Global Music",
        cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop",
        songs: [5, 10, 15, 13, 14],
        color: "#f5a623"
    },
    {
        id: 7,
        title: "R&B Essentials",
        description: "The best R&B tracks of all time.",
        creator: "Global Music",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        songs: [7, 10, 11, 17],
        color: "#c13584"
    },
    {
        id: 8,
        title: "K-Pop Favorites",
        description: "The hottest K-Pop tracks right now.",
        creator: "Global Music",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
        songs: [12, 13, 14],
        color: "#833ab4"
    }
];

// Genres Data
const genres = [
    { name: "Pop", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop", color: "#1DB954" },
    { name: "Hip-Hop", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop", color: "#833ab4" },
    { name: "R&B", cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&h=200&fit=crop", color: "#c13584" },
    { name: "Rock", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop", color: "#fd1d1d" },
    { name: "Electronic", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop", color: "#f5a623" },
    { name: "Jazz", cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&h=200&fit=crop", color: "#2d46b9" },
    { name: "Classical", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop", color: "#1e1e1e" },
    { name: "Country", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop", color: "#1DB954" },
    { name: "Reggae", cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&h=200&fit=crop", color: "#f5a623" },
    { name: "K-Pop", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop", color: "#c13584" },
    { name: "Latin", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop", color: "#fd1d1d" },
    { name: "Indie", cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&h=200&fit=crop", color: "#833ab4" }
];

// State Variables
let currentSongIndex = -1;
let currentPlaylist = [];
let isPlaying = false;
let isShuffled = false;
let isRepeating = false;
let isMuted = false;
let volume = 100;
let likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];
let userPlaylists = JSON.parse(localStorage.getItem('userPlaylists')) || [];
let recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed')) || [];
let currentSection = 'home';
let currentSearchQuery = '';
let contextMenuSong = null;

// Initialize the app
function init() {
    loadUserData();
    renderRecentlyPlayed();
    renderFeaturedPlaylists();
    renderTopCharts();
    renderGenres();
    renderNewReleases();
    renderUserPlaylists();
    renderLikedSongs();
    setupEventListeners();
    showToast('Welcome to Global Music! Start exploring millions of songs.');
}

// Load user data from localStorage
function loadUserData() {
    likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];
    userPlaylists = JSON.parse(localStorage.getItem('userPlaylists')) || [];
    recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed')) || [];
}

// Save user data to localStorage
function saveUserData() {
    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
    localStorage.setItem('userPlaylists', JSON.stringify(userPlaylists));
    localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
}
