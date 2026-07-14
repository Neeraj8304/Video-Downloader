// Main Application Functions

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    document.addEventListener('click', function(e) {
        if (e.target.closest('.sidebar') || e.target.closest('.nav-item')) return;
        
        // Close context menu
        const contextMenu = document.getElementById('contextMenu');
        if (!e.target.closest('#contextMenu')) {
            contextMenu.classList.remove('active');
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch (e.key) {
            case ' ':
                e.preventDefault();
                togglePlay();
                break;
            case 'ArrowRight':
                nextSong();
                break;
            case 'ArrowLeft':
                previousSong();
                break;
        }
    });

    // Audio player events
    const audio = document.getElementById('audioPlayer');
    audio.addEventListener('play', function() {
        isPlaying = true;
        updatePlayPauseButton();
    });
    audio.addEventListener('pause', function() {
        isPlaying = false;
        updatePlayPauseButton();
    });
}

// Section switching
function switchSection(section) {
    // Hide all sections
    document.querySelectorAll('[id$=Section]').forEach(el => {
        el.style.display = 'none';
    });
    
    // Remove active class from nav items
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('active');
    });
    
    // Show selected section
    currentSection = section;
    
    if (section === 'home') {
        document.getElementById('homeSection').style.display = 'block';
        document.querySelector('.nav-item').classList.add('active');
    } else if (section === 'search') {
        document.getElementById('searchSection').style.display = 'block';
        document.querySelectorAll('.nav-item')[1].classList.add('active');
        document.getElementById('searchInput').focus();
    } else if (section === 'library') {
        document.getElementById('librarySection').style.display = 'block';
        document.querySelectorAll('.nav-item')[2].classList.add('active');
        renderLibraryPlaylists();
        renderAllLikedSongs();
    } else if (section === 'charts') {
        document.getElementById('chartsSection').style.display = 'block';
        renderGlobalCharts();
    } else if (section === 'new-releases') {
        document.getElementById('newReleasesSection').style.display = 'block';
        renderAllNewReleases();
    } else if (section === 'liked') {
        document.getElementById('likedSection').style.display = 'block';
        renderAllLikedSongs();
    } else if (section === 'create-playlist') {
        openCreatePlaylistModal();
    }
}

// Search functionality
function handleSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    currentSearchQuery = query;
    
    if (query.length === 0) {
        document.getElementById('searchResults').classList.remove('active');
        return;
    }
    
    document.getElementById('searchResults').classList.add('active');
    switchSearchTab('all');
    
    // Filter songs
    const filteredSongs = songs.filter(song => 
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.album.toLowerCase().includes(query) ||
        song.genre.toLowerCase().includes(query)
    );
    
    // Filter artists
    const filteredArtists = [...new Set(songs.map(s => s.artist).filter(artist => 
        artist.toLowerCase().includes(query)
    ))];
    
    // Filter albums
    const filteredAlbums = [...new Set(songs.map(s => s.album).filter(album => 
        album.toLowerCase().includes(query)
    ))];
    
    // Filter playlists
    const filteredPlaylists = playlists.filter(playlist => 
        playlist.title.toLowerCase().includes(query) ||
        playlist.description.toLowerCase().includes(query) ||
        playlist.creator.toLowerCase().includes(query)
    );
    
    // Render results
    renderSearchResults(filteredSongs, filteredArtists, filteredAlbums, filteredPlaylists);
}

function switchSearchTab(tab) {
    document.querySelectorAll('.search-tab').forEach(el => {
        el.classList.remove('active');
    });
    document.querySelectorAll('.search-content').forEach(el => {
        el.classList.remove('active');
    });
    
    event.target.classList.add('active');
    document.getElementById('search' + tab.charAt(0).toUpperCase() + tab.slice(1)).classList.add('active');
}

function renderSearchResults(songsList, artistsList, albumsList, playlistsList) {
    // All tab
    const allTab = document.getElementById('searchAll');
    allTab.innerHTML = '';
    
    if (songsList.length > 0) {
        const songsSection = document.createElement('div');
        songsSection.className = 'section';
        songsSection.innerHTML = '<h3 class="section-title">Songs</h3>';
        const songsGrid = document.createElement('div');
        songsGrid.className = 'songs-grid';
        songsGrid.appendChild(renderSongs(songsList.slice(0, 6)));
        songsSection.appendChild(songsGrid);
        allTab.appendChild(songsSection);
    }
    
    if (artistsList.length > 0) {
        const artistsSection = document.createElement('div');
        artistsSection.className = 'section';
        artistsSection.innerHTML = '<h3 class="section-title">Artists</h3>';
        const artistsGrid = document.createElement('div');
        artistsGrid.className = 'genres-grid';
        artistsList.forEach(artist => {
            const artistCard = document.createElement('div');
            artistCard.className = 'genre-card';
            artistCard.innerHTML = `
                <div class="genre-cover">
                    <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop" alt="${artist}">
                </div>
                <div class="genre-title">${artist}</div>
            `;
            artistCard.onclick = () => searchByArtist(artist);
            artistsGrid.appendChild(artistCard);
        });
        artistsSection.appendChild(artistsGrid);
        allTab.appendChild(artistsSection);
    }
    
    if (playlistsList.length > 0) {
        const playlistsSection = document.createElement('div');
        playlistsSection.className = 'section';
        playlistsSection.innerHTML = '<h3 class="section-title">Playlists</h3>';
        const playlistsGrid = document.createElement('div');
        playlistsGrid.className = 'featured-grid';
        playlistsList.forEach(playlist => {
            playlistsGrid.appendChild(createPlaylistCard(playlist));
        });
        playlistsSection.appendChild(playlistsGrid);
        allTab.appendChild(playlistsSection);
    }
    
    // Songs tab
    document.getElementById('searchSongs').innerHTML = '';
    const songsSection = document.createElement('div');
    songsSection.className = 'section';
    const songsGrid = document.createElement('div');
    songsGrid.className = 'songs-grid';
    songsGrid.appendChild(renderSongs(songsList));
    songsSection.appendChild(songsGrid);
    document.getElementById('searchSongs').appendChild(songsSection);
    
    // Artists tab
    document.getElementById('searchArtists').innerHTML = '';
    const artistsSection = document.createElement('div');
    artistsSection.className = 'section';
    const artistsGrid = document.createElement('div');
    artistsGrid.className = 'genres-grid';
    artistsList.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.className = 'genre-card';
        artistCard.innerHTML = `
            <div class="genre-cover">
                <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop" alt="${artist}">
            </div>
            <div class="genre-title">${artist}</div>
        `;
        artistCard.onclick = () => searchByArtist(artist);
        artistsGrid.appendChild(artistCard);
    });
    artistsSection.appendChild(artistsGrid);
    document.getElementById('searchArtists').appendChild(artistsSection);
    
    // Albums tab
    document.getElementById('searchAlbums').innerHTML = '';
    const albumsSection = document.createElement('div');
    albumsSection.className = 'section';
    const albumsGrid = document.createElement('div');
    albumsGrid.className = 'featured-grid';
    albumsList.forEach(album => {
        const albumCard = document.createElement('div');
        albumCard.className = 'playlist-card';
        const albumSongs = songs.filter(s => s.album === album);
        const albumCover = albumSongs.length > 0 ? albumSongs[0].cover : 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop';
        albumCard.innerHTML = `
            <div class="playlist-cover">
                <img src="${albumCover}" alt="${album}">
                <div class="playlist-play">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="playlist-title">${album}</div>
            <div class="playlist-creator">Album • ${albumSongs.length} songs</div>
        `;
        albumCard.onclick = () => searchByAlbum(album);
        albumsGrid.appendChild(albumCard);
    });
    albumsSection.appendChild(albumsGrid);
    document.getElementById('searchAlbums').appendChild(albumsSection);
    
    // Playlists tab
    document.getElementById('searchPlaylists').innerHTML = '';
    const playlistsSection = document.createElement('div');
    playlistsSection.className = 'section';
    const playlistsGrid = document.createElement('div');
    playlistsGrid.className = 'featured-grid';
    playlistsList.forEach(playlist => {
        playlistsGrid.appendChild(createPlaylistCard(playlist));
    });
    playlistsSection.appendChild(playlistsGrid);
    document.getElementById('searchPlaylists').appendChild(playlistsSection);
}

function searchByArtist(artist) {
    document.getElementById('searchInput').value = artist;
    handleSearch();
    switchSection('search');
    switchSearchTab('songs');
}

function searchByAlbum(album) {
    document.getElementById('searchInput').value = album;
    handleSearch();
    switchSection('search');
    switchSearchTab('songs');
}

// Render functions
function renderRecentlyPlayed() {
    const container = document.getElementById('recentlyPlayed');
    container.innerHTML = '';
    
    if (recentlyPlayed.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center; grid-column: 1 / -1;">No recently played songs</p>';
        return;
    }
    
    const recentSongs = recentlyPlayed.slice(0, 6).map(id => 
        songs.find(song => song.id === id)
    ).filter(song => song);
    
    container.appendChild(renderSongs(recentSongs));
}

function renderFeaturedPlaylists() {
    const container = document.getElementById('featuredPlaylists');
    container.innerHTML = '';
    
    playlists.slice(0, 6).forEach(playlist => {
        container.appendChild(createPlaylistCard(playlist));
    });
}

function renderTopCharts() {
    const container = document.getElementById('topCharts');
    container.innerHTML = '';
    
    // Sort by popularity
    const sortedSongs = [...songs].sort((a, b) => b.popularity - a.popularity);
    
    sortedSongs.slice(0, 10).forEach((song, index) => {
        const chartItem = document.createElement('div');
        chartItem.className = 'chart-item';
        chartItem.innerHTML = `
            <div class="chart-rank">${index + 1}</div>
            <div class="chart-cover">
                <img src="${song.cover}" alt="${song.title}">
            </div>
            <div class="chart-info">
                <div class="chart-title">${song.title}</div>
                <div class="chart-artist">${song.artist}</div>
            </div>
            <div class="chart-duration">${song.duration}</div>
        `;
        chartItem.onclick = () => playSong(song);
        chartItem.oncontextmenu = (e) => showContextMenu(e, song);
        container.appendChild(chartItem);
    });
}

function renderGenres() {
    const container = document.getElementById('genres');
    container.innerHTML = '';
    
    genres.forEach(genre => {
        const genreCard = document.createElement('div');
        genreCard.className = 'genre-card';
        genreCard.innerHTML = `
            <div class="genre-cover" style="background: ${genre.color};">
                <img src="${genre.cover}" alt="${genre.name}">
            </div>
            <div class="genre-title">${genre.name}</div>
        `;
        genreCard.onclick = () => filterByGenre(genre.name);
        container.appendChild(genreCard);
    });
}

function filterByGenre(genre) {
    const filteredSongs = songs.filter(song => song.genre === genre);
    currentPlaylist = filteredSongs;
    currentSongIndex = 0;
    playSong(filteredSongs[0]);
    showToast(`Now playing ${genre} music`);
}

function renderNewReleases() {
    const container = document.getElementById('newReleases');
    container.innerHTML = '';
    
    // Sort by year (newest first)
    const sortedSongs = [...songs].sort((a, b) => b.year - a.year);
    
    sortedSongs.slice(0, 6).forEach(song => {
        const newReleaseCard = document.createElement('div');
        newReleaseCard.className = 'new-release-card';
        newReleaseCard.innerHTML = `
            <div class="new-release-header">
                <div class="new-release-cover">
                    <img src="${song.cover}" alt="${song.title}">
                </div>
                <div class="new-release-info">
                    <div class="new-release-type">Single</div>
                    <div class="new-release-title">${song.title}</div>
                    <div class="new-release-artist">${song.artist}</div>
                </div>
            </div>
        `;
        newReleaseCard.onclick = () => playSong(song);
        container.appendChild(newReleaseCard);
    });
}

function renderAllNewReleases() {
    const container = document.getElementById('allNewReleases');
    container.innerHTML = '';
    
    const sortedSongs = [...songs].sort((a, b) => b.year - a.year);
    sortedSongs.forEach(song => {
        const newReleaseCard = document.createElement('div');
        newReleaseCard.className = 'new-release-card';
        newReleaseCard.innerHTML = `
            <div class="new-release-header">
                <div class="new-release-cover">
                    <img src="${song.cover}" alt="${song.title}">
                </div>
                <div class="new-release-info">
                    <div class="new-release-type">Single</div>
                    <div class="new-release-title">${song.title}</div>
                    <div class="new-release-artist">${song.artist}</div>
                </div>
            </div>
        `;
        newReleaseCard.onclick = () => playSong(song);
        container.appendChild(newReleaseCard);
    });
}

function renderUserPlaylists() {
    const container = document.getElementById('userPlaylists');
    container.innerHTML = '';
    
    userPlaylists.forEach(playlist => {
        const playlistItem = document.createElement('div');
        playlistItem.className = 'playlist-item';
        playlistItem.textContent = playlist.title;
        playlistItem.onclick = () => playPlaylist(playlist);
        container.appendChild(playlistItem);
    });
}

function renderLibraryPlaylists() {
    const container = document.getElementById('libraryPlaylists');
    container.innerHTML = '';
    
    if (userPlaylists.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center; grid-column: 1 / -1;">No playlists yet. Create one!</p>';
        return;
    }
    
    userPlaylists.forEach(playlist => {
        container.appendChild(createPlaylistCard(playlist));
    });
}

function renderLikedSongs() {
    const container = document.getElementById('likedSongs');
    container.innerHTML = '';
    
    if (likedSongs.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center; grid-column: 1 / -1;">No liked songs yet</p>';
        return;
    }
    
    const likedSongsList = likedSongs.map(id => 
        songs.find(song => song.id === id)
    ).filter(song => song);
    
    container.appendChild(renderSongs(likedSongsList.slice(0, 6)));
}

function renderAllLikedSongs() {
    const container = document.getElementById('allLikedSongs');
    container.innerHTML = '';
    
    if (likedSongs.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center; grid-column: 1 / -1;">No liked songs yet</p>';
        return;
    }
    
    const likedSongsList = likedSongs.map(id => 
        songs.find(song => song.id === id)
    ).filter(song => song);
    
    container.appendChild(renderSongs(likedSongsList));
}

function renderGlobalCharts() {
    const container = document.getElementById('globalCharts');
    container.innerHTML = '';
    
    const sortedSongs = [...songs].sort((a, b) => b.popularity - a.popularity);
    
    sortedSongs.forEach((song, index) => {
        const chartItem = document.createElement('div');
        chartItem.className = 'chart-item';
        chartItem.innerHTML = `
            <div class="chart-rank">${index + 1}</div>
            <div class="chart-cover">
                <img src="${song.cover}" alt="${song.title}">
            </div>
            <div class="chart-info">
                <div class="chart-title">${song.title}</div>
                <div class="chart-artist">${song.artist}</div>
            </div>
            <div class="chart-duration">${song.duration}</div>
        `;
        chartItem.onclick = () => playSong(song);
        chartItem.oncontextmenu = (e) => showContextMenu(e, song);
        container.appendChild(chartItem);
    });
}

// Playlist card creation
function createPlaylistCard(playlist) {
    const card = document.createElement('div');
    card.className = 'playlist-card';
    
    const playlistSongs = playlist.songs.map(id => 
        songs.find(song => song.id === id)
    ).filter(song => song);
    
    const coverUrl = playlist.cover || (playlistSongs.length > 0 ? playlistSongs[0].cover : 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop');
    
    card.innerHTML = `
        <div class="playlist-cover" style="background: ${playlist.color || '#1DB954'};">
            <img src="${coverUrl}" alt="${playlist.title}">
            <div class="playlist-play">
                <i class="fas fa-play"></i>
            </div>
        </div>
        <div class="playlist-title">${playlist.title}</div>
        <div class="playlist-description">${playlist.description || ''}</div>
        <div class="playlist-creator">${playlist.creator} • ${playlistSongs.length} songs</div>
    `;
    
    card.onclick = () => playPlaylist(playlist);
    card.oncontextmenu = (e) => showPlaylistContextMenu(e, playlist);
    
    return card;
}

// Song rendering
function renderSongs(songsList) {
    const fragment = document.createDocumentFragment();
    
    songsList.forEach(song => {
        const songCard = document.createElement('div');
        songCard.className = 'song-card';
        
        const isLiked = likedSongs.includes(song.id);
        const isCurrent = currentSongIndex >= 0 && currentPlaylist[currentSongIndex]?.id === song.id;
        
        if (isCurrent) {
            songCard.classList.add('playing');
        }
        
        songCard.innerHTML = `
            <div class="song-cover">
                <img src="${song.cover}" alt="${song.title}">
                <div class="play-overlay">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <div class="song-meta">
                <span>${song.duration}</span>
                <button class="download-btn" onclick="event.stopPropagation(); downloadSong(${song.id});">
                    <i class="fas fa-download"></i>
                    Download
                </button>
            </div>
        `;
        
        songCard.onclick = () => playSong(song);
        songCard.oncontextmenu = (e) => showContextMenu(e, song);
        
        fragment.appendChild(songCard);
    });
    
    return fragment;
}

// Player functions
function playSong(song) {
    const audio = document.getElementById('audioPlayer');
    
    // Add to recently played
    if (!recentlyPlayed.includes(song.id)) {
        recentlyPlayed.unshift(song.id);
        if (recentlyPlayed.length > 50) {
            recentlyPlayed.pop();
        }
        saveUserData();
        renderRecentlyPlayed();
    }
    
    // Set current song
    currentPlaylist = [song];
    currentSongIndex = 0;
    
    // Update player
    audio.src = song.url;
    document.getElementById('currentCover').src = song.cover;
    document.getElementById('currentTitle').textContent = song.title;
    document.getElementById('currentArtist').textContent = song.artist;
    
    // Play
    audio.play();
    isPlaying = true;
    updatePlayPauseButton();
    
    // Update queue
    updateQueue();
    
    // Highlight playing song
    highlightPlayingSong(song.id);
    
    showToast(`Now playing: ${song.title} - ${song.artist}`);
}

function playPlaylist(playlist) {
    const playlistSongs = playlist.songs.map(id => 
        songs.find(song => song.id === id)
    ).filter(song => song);
    
    if (playlistSongs.length === 0) {
        showToast('This playlist is empty');
        return;
    }
    
    currentPlaylist = playlistSongs;
    currentSongIndex = 0;
    playSong(playlistSongs[0]);
    
    showToast(`Now playing playlist: ${playlist.title}`);
}

function playAllLikedSongs() {
    const likedSongsList = likedSongs.map(id => 
        songs.find(song => song.id === id)
    ).filter(song => song);
    
    if (likedSongsList.length === 0) {
        showToast('No liked songs to play');
        return;
    }
    
    currentPlaylist = likedSongsList;
    currentSongIndex = 0;
    playSong(likedSongsList[0]);
}

function highlightPlayingSong(songId) {
    document.querySelectorAll('.song-card').forEach(card => {
        card.classList.remove('playing');
    });
    
    document.querySelectorAll('.chart-item').forEach(item => {
        item.classList.remove('playing');
    });
}

function togglePlay() {
    const audio = document.getElementById('audioPlayer');
    
    if (currentSongIndex === -1) {
        // Play first song
        if (currentPlaylist.length > 0) {
            playSong(currentPlaylist[0]);
        } else if (songs.length > 0) {
            playSong(songs[0]);
        }
        return;
    }
    
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
}

function nextSong() {
    const audio = document.getElementById('audioPlayer');
    
    if (currentPlaylist.length === 0) return;
    
    if (isShuffled) {
        currentSongIndex = Math.floor(Math.random() * currentPlaylist.length);
    } else if (isRepeating) {
        // Repeat current song
        audio.currentTime = 0;
        audio.play();
        return;
    } else {
        currentSongIndex = (currentSongIndex + 1) % currentPlaylist.length;
    }
    
    playSong(currentPlaylist[currentSongIndex]);
}

function previousSong() {
    if (currentPlaylist.length === 0) return;
    
    if (isShuffled) {
        currentSongIndex = Math.floor(Math.random() * currentPlaylist.length);
    } else {
        currentSongIndex = (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    }
    
    playSong(currentPlaylist[currentSongIndex]);
}

function shuffleSongs() {
    isShuffled = !isShuffled;
    const shuffleBtn = document.querySelector('.player-btn[title="Shuffle"]');
    
    if (isShuffled) {
        shuffleBtn.style.color = 'var(--primary)';
        showToast('Shuffle enabled');
    } else {
        shuffleBtn.style.color = 'var(--text-secondary)';
        showToast('Shuffle disabled');
    }
}

function toggleRepeat() {
    isRepeating = !isRepeating;
    const repeatBtn = document.getElementById('repeatBtn');
    
    if (isRepeating) {
        repeatBtn.style.color = 'var(--primary)';
        showToast('Repeat enabled');
    } else {
        repeatBtn.style.color = 'var(--text-secondary)';
        showToast('Repeat disabled');
    }
}

function updatePlayPauseButton() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const icon = playPauseBtn.querySelector('i');
    
    if (isPlaying) {
        icon.className = 'fas fa-pause';
    } else {
        icon.className = 'fas fa-play';
    }
}

function updateProgress() {
    const audio = document.getElementById('audioPlayer');
    const progressFill = document.getElementById('progressFill');
    const currentTimeEl = document.getElementById('currentTime');
    
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = progress + '%';
        
        // Update current time
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
}

function updateDuration() {
    const audio = document.getElementById('audioPlayer');
    const durationEl = document.getElementById('duration');
    
    if (audio.duration) {
        durationEl.textContent = formatTime(audio.duration);
    }
}

function seek(event) {
    const audio = document.getElementById('audioPlayer');
    const progressBar = event.target.closest('.progress-bar');
    const rect = progressBar.getBoundingClientRect();
    const pos = (event.clientX - rect.left) / rect.width;
    
    audio.currentTime = pos * audio.duration;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return minutes + ':' + (secs < 10 ? '0' : '') + secs;
}

function setVolume(value) {
    const audio = document.getElementById('audioPlayer');
    volume = value;
    audio.volume = value / 100;
    
    if (value === 0) {
        isMuted = true;
        document.getElementById('volumeBtn').innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        isMuted = false;
        document.getElementById('volumeBtn').innerHTML = '<i class="fas fa-volume-up"></i>';
    }
}

function toggleMute() {
    const audio = document.getElementById('audioPlayer');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    
    if (isMuted) {
        audio.volume = volume / 100;
        volumeSlider.value = volume;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        isMuted = false;
    } else {
        audio.volume = 0;
        volumeSlider.value = 0;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        isMuted = true;
    }
}

function toggleQueue() {
    const queueSidebar = document.getElementById('queueSidebar');
    queueSidebar.classList.toggle('active');
}

function updateQueue() {
    const queueList = document.getElementById('queueList');
    queueList.innerHTML = '';
    
    if (currentPlaylist.length === 0) {
        queueList.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">No songs in queue</p>';
        return;
    }
    
    currentPlaylist.forEach((song, index) => {
        const queueItem = document.createElement('div');
        queueItem.className = 'queue-item' + (index === currentSongIndex ? ' current' : '');
        queueItem.innerHTML = `
            <div class="queue-cover">
                <img src="${song.cover}" alt="${song.title}">
            </div>
            <div class="queue-info">
                <div class="queue-title">${song.title}</div>
                <div class="queue-artist">${song.artist}</div>
            </div>
            <div class="queue-duration">${song.duration}</div>
            <button class="queue-remove" onclick="removeFromQueue(${index}); event.stopPropagation();">
                <i class="fas fa-times"></i>
            </button>
        `;
        queueItem.onclick = () => {
            currentSongIndex = index;
            playSong(song);
        };
        queueList.appendChild(queueItem);
    });
}

function removeFromQueue(index) {
    if (index < currentSongIndex) {
        currentSongIndex--;
    }
    
    currentPlaylist.splice(index, 1);
    
    if (currentPlaylist.length === 0) {
        currentSongIndex = -1;
        const audio = document.getElementById('audioPlayer');
        audio.pause();
        audio.src = '';
        document.getElementById('currentTitle').textContent = 'No song selected';
        document.getElementById('currentArtist').textContent = 'Select a song to play';
    } else if (currentSongIndex >= currentPlaylist.length) {
        currentSongIndex = 0;
        playSong(currentPlaylist[0]);
    }
    
    updateQueue();
    showToast('Removed from queue');
}

function addToQueue(song) {
    if (!currentPlaylist.some(s => s.id === song.id)) {
        currentPlaylist.push(song);
        updateQueue();
        showToast(`Added to queue: ${song.title}`);
    } else {
        showToast(`${song.title} is already in the queue`);
    }
}

// Like and download functions
function likeSong(song) {
    if (!likedSongs.includes(song.id)) {
        likedSongs.push(song.id);
        saveUserData();
        renderLikedSongs();
        showToast(`Liked: ${song.title}`);
    } else {
        showToast(`${song.title} is already liked`);
    }
}

function unlikeSong(song) {
    const index = likedSongs.indexOf(song.id);
    if (index > -1) {
        likedSongs.splice(index, 1);
        saveUserData();
        renderLikedSongs();
        showToast(`Unliked: ${song.title}`);
    }
}

function downloadSong(songId) {
    const song = songs.find(s => s.id === songId);
    if (song) {
        showToast(`Downloading: ${song.title}`);
        
        // In a real app, this would trigger a download
        // For demo purposes, we'll simulate it
        setTimeout(() => {
            showToast(`Download complete: ${song.title}`);
        }, 2000);
        
        // Create a download link (simulated)
        const link = document.createElement('a');
        link.href = song.url;
        link.download = `${song.title} - ${song.artist}.mp3`;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function downloadCurrentSong() {
    if (currentSongIndex >= 0 && currentPlaylist[currentSongIndex]) {
        downloadSong(currentPlaylist[currentSongIndex].id);
    } else {
        showToast('No song is currently playing');
    }
}

// Playlist functions
function openCreatePlaylistModal() {
    document.getElementById('createPlaylistModal').classList.add('active');
}

function closeCreatePlaylistModal() {
    document.getElementById('createPlaylistModal').classList.remove('active');
    document.getElementById('playlistName').value = '';
    document.getElementById('playlistDescription').value = '';
}

function createPlaylist() {
    const name = document.getElementById('playlistName').value.trim();
    const description = document.getElementById('playlistDescription').value.trim();
    
    if (!name) {
        showToast('Please enter a playlist name');
        return;
    }
    
    const newPlaylist = {
        id: Date.now(),
        title: name,
        description: description,
        creator: document.getElementById('userName').textContent,
        cover: null,
        songs: [],
        color: getRandomColor()
    };
    
    userPlaylists.push(newPlaylist);
    saveUserData();
    
    renderUserPlaylists();
    closeCreatePlaylistModal();
    
    showToast(`Playlist "${name}" created!`);
}

function getRandomColor() {
    const colors = ['#1DB954', '#833ab4', '#c13584', '#fd1d1d', '#f5a623', '#2d46b9'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Context menu functions
function showContextMenu(event, song) {
    event.preventDefault();
    contextMenuSong = song;
    
    const contextMenu = document.getElementById('contextMenu');
    contextMenu.style.left = event.clientX + 'px';
    contextMenu.style.top = event.clientY + 'px';
    contextMenu.classList.add('active');
}

function showPlaylistContextMenu(event, playlist) {
    event.preventDefault();
    contextMenuSong = playlist;
    
    const contextMenu = document.getElementById('contextMenu');
    contextMenu.style.left = event.clientX + 'px';
    contextMenu.style.top = event.clientY + 'px';
    contextMenu.classList.add('active');
}

function playSongFromContext() {
    if (contextMenuSong) {
        if (contextMenuSong.songs) {
            playPlaylist(contextMenuSong);
        } else {
            playSong(contextMenuSong);
        }
    }
    closeContextMenu();
}

function addToQueueFromContext() {
    if (contextMenuSong && !contextMenuSong.songs) {
        addToQueue(contextMenuSong);
    }
    closeContextMenu();
}

function addToPlaylistFromContext() {
    if (contextMenuSong && !contextMenuSong.songs) {
        // In a real app, this would show a playlist selection modal
        showToast('Add to playlist feature coming soon!');
    }
    closeContextMenu();
}

function likeSongFromContext() {
    if (contextMenuSong && !contextMenuSong.songs) {
        const isLiked = likedSongs.includes(contextMenuSong.id);
        if (isLiked) {
            unlikeSong(contextMenuSong);
        } else {
            likeSong(contextMenuSong);
        }
    }
    closeContextMenu();
}

function downloadSongFromContext() {
    if (contextMenuSong && !contextMenuSong.songs) {
        downloadSong(contextMenuSong.id);
    }
    closeContextMenu();
}

function shareSongFromContext() {
    if (contextMenuSong && !contextMenuSong.songs) {
        const shareText = `Check out ${contextMenuSong.title} by ${contextMenuSong.artist}!`;
        if (navigator.share) {
            navigator.share({
                title: contextMenuSong.title,
                text: shareText,
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            prompt('Copy this link to share:', shareText);
        }
    }
    closeContextMenu();
}

function removeFromContext() {
    if (contextMenuSong) {
        if (contextMenuSong.songs) {
            // Remove playlist
            const index = userPlaylists.findIndex(p => p.id === contextMenuSong.id);
            if (index > -1) {
                userPlaylists.splice(index, 1);
                saveUserData();
                renderUserPlaylists();
                showToast(`Playlist "${contextMenuSong.title}" removed`);
            }
        } else {
            // Remove from liked songs
            unlikeSong(contextMenuSong);
        }
    }
    closeContextMenu();
}

function closeContextMenu() {
    document.getElementById('contextMenu').classList.remove('active');
    contextMenuSong = null;
}

// Toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// Initialize on page load
window.onload = init;
