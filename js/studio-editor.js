
document.addEventListener('DOMContentLoaded', function() {
    // Video and timeline elements
    const video = document.getElementById('main-video');
    const timeline = document.getElementById('timeline-container');
    const playhead = document.getElementById('playhead');

    // Editing tools
    const cutBtn = document.getElementById('cut-btn');
    const trimBtn = document.getElementById('trim-btn');
    const addTextBtn = document.getElementById('add-text-btn');
    const addEffectBtn = document.getElementById('add-effect-btn');

    // Clip library
    const addClipBtn = document.getElementById('add-clip-btn');
    const clipList = document.getElementById('clip-list');

    // Text overlay
    const applyTextBtn = document.getElementById('apply-text-btn');
    const textInput = document.getElementById('text-input');
    const fontSelect = document.getElementById('font-select');
    const textColor = document.getElementById('text-color');

    // Audio mixer
    const mainAudioVolume = document.getElementById('main-audio-volume');
    const bgMusicVolume = document.getElementById('bg-music-volume');

    // Effect library
    const effectList = document.getElementById('effect-list');

    // New elements for past streams
    const pastStreamsList = document.getElementById('past-streams-list');
    const loadStreamBtn = document.getElementById('load-stream-btn');
    const deleteStreamBtn = document.getElementById('delete-stream-btn');

    // New elements for linked platforms
    const linkedPlatformsList = document.getElementById('linked-platforms-list');
    const linkPlatformBtn = document.getElementById('link-platform-btn');

    // Export and repost
    const platformSelect = document.getElementById('platform-select');
    const exportBtn = document.getElementById('export-btn');

    // Update playhead position as video plays
    video.addEventListener('timeupdate', function() {
        const progress = (video.currentTime / video.duration) * 100;
        playhead.style.left = `${progress}%`;
    });

    // Allow seeking by clicking on the timeline
    timeline.addEventListener('click', function(e) {
        const rect = timeline.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
    });

    // Cutting functionality
    cutBtn.addEventListener('click', function() {
        console.log('Cut at:', video.currentTime);
        // TODO: Implement actual cutting logic
    });

    // Trim functionality
    trimBtn.addEventListener('click', function() {
        console.log('Trim functionality to be implemented');
        // TODO: Implement trimming logic
    });

    // Add text overlay
    addTextBtn.addEventListener('click', function() {
        const textOverlay = document.createElement('div');
        textOverlay.textContent = 'Sample Text';
        textOverlay.style.position = 'absolute';
        textOverlay.style.color = 'white';
        textOverlay.style.top = '50%';
        textOverlay.style.left = '50%';
        textOverlay.style.transform = 'translate(-50%, -50%)';
        video.parentElement.appendChild(textOverlay);
    });

    // Add effect
    addEffectBtn.addEventListener('click', function() {
        console.log('Add effect functionality to be implemented');
        // TODO: Implement effect addition logic
    });

    // Add clip to library
    addClipBtn.addEventListener('click', function() {
        const clipItem = document.createElement('div');
        clipItem.textContent = `Clip ${clipList.children.length + 1}`;
        clipList.appendChild(clipItem);
    });

    // Apply text overlay
    applyTextBtn.addEventListener('click', function() {
        const text = textInput.value;
        const font = fontSelect.value;
        const color = textColor.value;
        
        const textOverlay = document.createElement('div');
        textOverlay.textContent = text;
        textOverlay.style.position = 'absolute';
        textOverlay.style.color = color;
        textOverlay.style.fontFamily = font;
        textOverlay.style.top = '50%';
        textOverlay.style.left = '50%';
        textOverlay.style.transform = 'translate(-50%, -50%)';
        video.parentElement.appendChild(textOverlay);
    });

    // Audio mixer functionality
    mainAudioVolume.addEventListener('input', function() {
        video.volume = this.value / 100;
    });

    bgMusicVolume.addEventListener('input', function() {
        // TODO: Implement background music volume control
        console.log('Background music volume:', this.value);
    });

    // Initialize effect library
    const effects = ['Blur', 'Sepia', 'Grayscale', 'Invert'];
    effects.forEach(effect => {
        const effectItem = document.createElement('div');
        effectItem.textContent = effect;
        effectItem.addEventListener('click', function() {
            console.log(`Applying ${effect} effect`);
            // TODO: Implement effect application logic
        });
        effectList.appendChild(effectItem);
    });

    // Past streams functionality
    function loadPastStreams() {
        // TODO: Fetch past streams from server
        const pastStreams = [
            { id: 1, title: 'Stream 1', date: '2023-05-01' },
            { id: 2, title: 'Stream 2', date: '2023-05-05' },
            { id: 3, title: 'Stream 3', date: '2023-05-10' }
        ];

        pastStreamsList.innerHTML = '';
        pastStreams.forEach(stream => {
            const streamItem = document.createElement('div');
            streamItem.classList.add('past-streams-item');
            streamItem.innerHTML = `
                <span>${stream.title} (${stream.date})</span>
                <button class="load-stream" data-id="${stream.id}">Load</button>
                <button class="delete-stream" data-id="${stream.id}">Delete</button>
            `;
            pastStreamsList.appendChild(streamItem);
        });
    }

    loadPastStreams();

    pastStreamsList.addEventListener('click', function(e) {
        if (e.target.classList.contains('load-stream')) {
            const streamId = e.target.getAttribute('data-id');
            console.log(`Loading stream ${streamId}`);
            // TODO: Implement stream loading logic
        } else if (e.target.classList.contains('delete-stream')) {
            const streamId = e.target.getAttribute('data-id');
            console.log(`Deleting stream ${streamId}`);
            // TODO: Implement stream deletion logic
        }
    });

    // Linked platforms functionality
    function loadLinkedPlatforms() {
        // TODO: Fetch linked platforms from server
        const linkedPlatforms = ['YouTube', 'Twitch', 'Facebook'];

        linkedPlatformsList.innerHTML = '';
        linkedPlatforms.forEach(platform => {
            const platformItem = document.createElement('div');
            platformItem.classList.add('linked-platform-item');
            platformItem.innerHTML = `
                <span>${platform}</span>
                <button class="unlink-platform" data-platform="${platform}">Unlink</button>
            `;
            linkedPlatformsList.appendChild(platformItem);
        });
    }

    loadLinkedPlatforms();

    linkedPlatformsList.addEventListener('click', function(e) {
        if (e.target.classList.contains('unlink-platform')) {
            const platform = e.target.getAttribute('data-platform');
            console.log(`Unlinking ${platform}`);
            // TODO: Implement platform unlinking logic
        }
    });

    linkPlatformBtn.addEventListener('click', function() {
        console.log('Linking new platform');
        // TODO: Implement new platform linking logic
    });

    // Export and repost functionality
    exportBtn.addEventListener('click', function() {
        const selectedPlatforms = Array.from(platformSelect.selectedOptions).map(option => option.value);
        if (selectedPlatforms.length > 0) {
            console.log(`Exporting and reposting to: ${selectedPlatforms.join(', ')}`);
            // TODO: Implement export and repost logic
        } else {
            alert('Please select at least one platform to export and repost.');
        }
    });
});