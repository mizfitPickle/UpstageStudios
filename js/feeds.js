
document.addEventListener('DOMContentLoaded', function() {
    const feedCarousel = document.querySelector('.feed-carousel');
    const prevButton = document.getElementById('prev-feed');
    const nextButton = document.getElementById('next-feed');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const recommendedStreamList = document.querySelector('.recommended-stream-list');

    let currentIndex = 0;
    let autoScrollInterval;

    // Simulated stream data
    const streams = [
        { id: 1, streamer: "GamerPro", streamerId: 101, title: "Epic Gaming Stream", category: "Gaming", streamUrl: "https://example.com/stream1.m3u8", likes: 1500, comments: 300, followerCount: 50000, streamerAvatar: "https://placehold.co/100x100", streamerBio: "Professional gamer and content creator" },
        { id: 2, streamer: "MusicMaster", streamerId: 102, title: "Chill Music Session", category: "Music", streamUrl: "https://example.com/stream2.m3u8", likes: 800, comments: 150, followerCount: 30000, streamerAvatar: "https://placehold.co/100x100", streamerBio: "Music producer and DJ" },
        { id: 3, streamer: "CreativeGenius", streamerId: 103, title: "Art Creation Live", category: "Creative", streamUrl: "https://example.com/stream3.m3u8", likes: 600, comments: 100, followerCount: 20000, streamerAvatar: "https://placehold.co/100x100", streamerBio: "Digital artist and illustrator" },
        { id: 4, streamer: "Wanderlust", streamerId: 104, title: "Travel Vlog: Tokyo", category: "IRL", streamUrl: "https://example.com/stream4.m3u8", likes: 2000, comments: 500, followerCount: 100000, streamerAvatar: "https://placehold.co/100x100", streamerBio: "World traveler and adventure seeker" },
        { id: 5, streamer: "TechGuru", streamerId: 105, title: "Latest Tech Review", category: "Technology", streamUrl: "https://example.com/stream5.m3u8", likes: 1200, comments: 250, followerCount: 75000, streamerAvatar: "https://placehold.co/100x100", streamerBio: "Tech enthusiast and reviewer" }
    ];

    function createFeedItem(stream) {
        return `
            <div class="feed-item">
                <div class="stream-container">
                    <video id="video-${stream.id}" class="stream-video" autoplay muted playsinline>
                        <source src="${stream.streamUrl}" type="application/x-mpegURL">
                    </video>
                    <div class="quality-options">
                        <select class="quality-selector" data-stream-id="${stream.id}">
                            <option value="auto">Auto</option>
                            <option value="1080p">1080p</option>
                            <option value="720p">720p</option>
                            <option value="480p">480p</option>
                            <option value="360p">360p</option>
                        </select>
                    </div>
                </div>
                <div class="stream-info">
                    <h2 class="streamer-name" data-streamer-id="${stream.streamerId}">${stream.streamer}</h2>
                    <h3 class="stream-title">${stream.title}</h3>
                    <p class="stream-category">${stream.category}</p>
                </div>
                <div class="stream-interactions">
                    <button class="like-btn" data-stream-id="${stream.id}">
                        <i class="fas fa-heart"></i> <span class="like-count">${stream.likes}</span>
                    </button>
                    <button class="comment-btn" data-stream-id="${stream.id}">
                        <i class="fas fa-comment"></i> <span class="comment-count">${stream.comments}</span>
                    </button>
                    <button class="follow-btn" data-streamer-id="${stream.streamerId}">
                        Follow
                    </button>
                </div>
            </div>
        `;
    }

    function loadFeeds(category = 'all') {
        feedCarousel.innerHTML = '';
        const filteredStreams = category === 'all' 
            ? streams 
            : streams.filter(stream => stream.category.toLowerCase() === category.toLowerCase());
        
        filteredStreams.forEach(stream => {
            feedCarousel.innerHTML += createFeedItem(stream);
        });

        initializeVideoPlayers();
        currentIndex = 0;
        showFeed(currentIndex);
    }

    function showFeed(index) {
        currentIndex = index;
        feedCarousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextFeed() {
        currentIndex = (currentIndex + 1) % streams.length;
        showFeed(currentIndex);
    }

    function prevFeed() {
        currentIndex = (currentIndex - 1 + streams.length) % streams.length;
        showFeed(currentIndex);
    }

    function startAutoScroll() {
        stopAutoScroll();
        autoScrollInterval = setInterval(nextFeed, 60000); // Change feed every minute
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    function initializeVideoPlayers() {
        streams.forEach(stream => {
            const videoElement = document.getElementById(`video-${stream.id}`);
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(stream.streamUrl);
                hls.attachMedia(videoElement);
            } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
                videoElement.src = stream.streamUrl;
            }
        });
    }

    function loadRecommendedStreams() {
        const recommendedStreams = streams.slice(0, 5);
        recommendedStreamList.innerHTML = '';
        recommendedStreams.forEach(stream => {
            recommendedStreamList.innerHTML += `
                <div class="recommended-stream-item">
                    <img src="https://placehold.co/200x112" alt="${stream.title}" class="recommended-stream-thumbnail">
                    <div class="recommended-stream-info">
                        <p class="recommended-streamer-name">${stream.streamer}</p>
                        <p class="recommended-stream-title">${stream.title}</p>
                    </div>
                </div>
            `;
        });
    }

    function handleInteraction(e) {
        if (e.target.classList.contains('like-btn')) {
            const streamId = e.target.dataset.streamId;
            console.log(`Liked stream ${streamId}`);
        } else if (e.target.classList.contains('comment-btn')) {
            const streamId = e.target.dataset.streamId;
            console.log(`Commenting on stream ${streamId}`);
        } else if (e.target.classList.contains('follow-btn')) {
            const streamerId = e.target.dataset.streamerId;
            console.log(`Following streamer ${streamerId}`);
        }
    }

    function handleStreamerHover(e) {
        if (e.target.classList.contains('streamer-name')) {
            const streamerId = e.target.dataset.streamerId;
            const streamer = streams.find(s => s.streamerId == streamerId);
            
            const preview = document.createElement('div');
            preview.className = 'streamer-profile-preview';
            preview.innerHTML = `
                <img src="${streamer.streamerAvatar}" alt="${streamer.streamer}" class="streamer-avatar">
                <div class="streamer-info">
                    <p class="streamer-bio">${streamer.streamerBio}</p>
                    <p class="follower-count">${streamer.followerCount} followers</p>
                </div>
            `;
            
            e.target.appendChild(preview);
        }
    }

    function handleStreamerHoverOut(e) {
        if (e.target.classList.contains('streamer-name')) {
            const preview = e.target.querySelector('.streamer-profile-preview');
            if (preview) {
                e.target.removeChild(preview);
            }
        }
    }

    function handleQualityChange(e) {
        if (e.target.classList.contains('quality-selector')) {
            const streamId = e.target.dataset.streamId;
            const quality = e.target.value;
            console.log(`Changing stream ${streamId} quality to ${quality}`);
        }
    }

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            nextFeed();
        }
        if (touchEndX - touchStartX > 50) {
            prevFeed();
        }
    }

    // Event Listeners
    nextButton.addEventListener('click', () => {
        nextFeed();
        stopAutoScroll();
        startAutoScroll();
    });

    prevButton.addEventListener('click', () => {
        prevFeed();
        stopAutoScroll();
        startAutoScroll();
    });

    categoryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            categoryFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            loadFeeds(filter.dataset.category);
        });
    });

    feedCarousel.addEventListener('click', handleInteraction);
    feedCarousel.addEventListener('mouseover', handleStreamerHover);
    feedCarousel.addEventListener('mouseout', handleStreamerHoverOut);
    feedCarousel.addEventListener('change', handleQualityChange);

    let touchStartX = 0;
    let touchEndX = 0;

    feedCarousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    feedCarousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextFeed();
        } else if (e.key === 'ArrowLeft') {
            prevFeed();
        }
    });

    // Initialize
    loadFeeds();
    loadRecommendedStreams();
    startAutoScroll();
});