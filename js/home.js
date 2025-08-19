

document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');
    const changeThemeBtn = document.getElementById('change-theme');
    const editProfileBtn = document.getElementById('edit-profile');
    const addMusicBtn = document.getElementById('add-music');

    // Navigation functionality
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.dataset.section;
            navButtons.forEach(btn => btn.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });

    // Theme changing functionality
    const themes = [
        { main: '#39FF14', secondary: '#00FFFF', background: '#000000' },
        { main: '#FF1493', secondary: '#FFFF00', background: '#000080' },
        { main: '#FFA500', secondary: '#00CED1', background: '#800080' }
    ];
    let currentTheme = 0;

    changeThemeBtn.addEventListener('click', () => {
        currentTheme = (currentTheme + 1) % themes.length;
        document.documentElement.style.setProperty('--main-color', themes[currentTheme].main);
        document.documentElement.style.setProperty('--secondary-color', themes[currentTheme].secondary);
        document.documentElement.style.setProperty('--background-color', themes[currentTheme].background);
    });

    // Edit profile functionality
    editProfileBtn.addEventListener('click', () => {
        const name = prompt('Enter your name:') || document.getElementById('profile-name').textContent;
        const tagline = prompt('Enter your tagline:') || document.getElementById('profile-tagline').textContent;
        const aboutText = prompt('Tell us about yourself:') || document.getElementById('about-text').textContent;

        document.getElementById('profile-name').textContent = name;
        document.getElementById('profile-tagline').textContent = tagline;
        document.getElementById('about-text').textContent = aboutText;
    });

    // Add music functionality (placeholder)
    addMusicBtn.addEventListener('click', () => {
        alert('Music feature coming soon!');
    });

    // Function to add a post
    function addPost(content, timestamp) {
        const postList = document.getElementById('post-list');
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <p>${content}</p>
            <small>${timestamp}</small>
        `;
        postList.prepend(postElement);
    }

    // Function to add a friend
    function addFriend(name, imageUrl) {
        const friendList = document.getElementById('friend-list');
        const friendElement = document.createElement('div');
        friendElement.classList.add('friend');
        friendElement.innerHTML = `
            <img src="${imageUrl}" alt="${name}">
            <p>${name}</p>
        `;
        friendList.appendChild(friendElement);
    }

    // Function to add a photo
    function addPhoto(imageUrl, caption) {
        const photoGallery = document.getElementById('photo-gallery');
        const photoElement = document.createElement('div');
        photoElement.classList.add('photo');
        photoElement.innerHTML = `
            <img src="${imageUrl}" alt="${caption}">
            <p>${caption}</p>
        `;
        photoGallery.appendChild(photoElement);
    }

    // Function to add a past stream
    function addPastStream(title, date, thumbnailUrl, videoUrl) {
        const streamList = document.getElementById('stream-list');
        const streamElement = document.createElement('div');
        streamElement.classList.add('past-stream');
        streamElement.innerHTML = `
            <img src="${thumbnailUrl}" alt="${title}">
            <div class="stream-info">
                <h3>${title}</h3>
                <p>Streamed on: ${date}</p>
                <a href="${videoUrl}" target="_blank">Watch</a>
            </div>
        `;
        streamList.appendChild(streamElement);
    }

    // Function to add a clip
    function addClip(title, duration, thumbnailUrl, clipUrl) {
        const clipList = document.getElementById('clip-list');
        const clipElement = document.createElement('div');
        clipElement.classList.add('clip');
        clipElement.innerHTML = `
            <img src="${thumbnailUrl}" alt="${title}">
            <div class="clip-info">
                <h3>${title}</h3>
                <p>Duration: ${duration}</p>
                <a href="${clipUrl}" target="_blank">Watch Clip</a>
            </div>
        `;
        clipList.appendChild(clipElement);
    }

    // Example usage of functions (for demonstration purposes)
    addPost("Just finished an amazing stream! Thanks to everyone who tuned in!", "2023-05-20 20:30");
    addPost("New emotes coming soon! Stay tuned!", "2023-05-19 15:45");

    addFriend("GameMaster42", "https://placehold.co/100x100?text=GM42");
    addFriend("StreamQueen", "https://placehold.co/100x100?text=SQ");

    addPhoto("https://placehold.co/300x200?text=Stream+Setup", "My new streaming setup!");
    addPhoto("https://placehold.co/300x200?text=Gaming+Night", "Late night gaming session");

    addPastStream("Epic Boss Battle Stream", "2023-05-15", "https://placehold.co/300x200?text=Boss+Battle", "https://example.com/past-stream-1");
    addPastStream("Chill Gaming and Chat", "2023-05-10", "https://placehold.co/300x200?text=Chill+Stream", "https://example.com/past-stream-2");

    addClip("Incredible Comeback!", "0:45", "https://placehold.co/200x150?text=Comeback", "https://example.com/clip-1");
    addClip("Hilarious Glitch Moment", "0:30", "https://placehold.co/200x150?text=Glitch", "https://example.com/clip-2");

    // Function to handle profile picture change
    function changeProfilePicture() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = e => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('profile-picture').src = event.target.result;
            }
            reader.readAsDataURL(file);
        }
        input.click();
    }

    // Add event listener to profile picture for changing
    document.getElementById('profile-picture').addEventListener('click', changeProfilePicture);

    // Function to handle cover photo change
    function changeCoverPhoto() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = e => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('cover-photo').style.backgroundImage = `url(${event.target.result})`;
            }
            reader.readAsDataURL(file);
        }
        input.click();
    }

    // Add event listener to cover photo for changing
    document.getElementById('cover-photo').addEventListener('click', changeCoverPhoto);
});