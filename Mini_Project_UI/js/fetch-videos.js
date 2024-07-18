document.addEventListener("DOMContentLoaded", function() {
    fetchVideos();
});

function fetchVideos() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error("No token found. Please log in.");
        return;
    }

    $.ajax({
        url: "http://localhost:5177/api/Video/Get_AllVideos",
        method: "GET",
        headers: {
            Authorization: "Bearer " + token
        },
        success: function(data) {
            const videos = data['$values'];
            displayVideos(videos);
        },
        error: function(error) {
            console.error("Error fetching videos:", error);
        }
    });
}

// Function to display videos
function displayVideos(videos) {
    const videosContainer = $("#videos-list");
    videosContainer.empty();

    // Object to store images URLs corresponding to video IDs
    const images = {
        2: 'images/products/1.jpg',
        3: 'images/products/2.jpg',
        4: 'images/products/3.jpg',
        5: 'images/products/4.jpg',
        6: 'images/products/5.jpg',
        7: 'images/products/6.jpg',
        8: 'images/products/7.jpg'
    };

    videos.forEach(video => {
        const imageUrl = images[video.videoId] || 'images/profile.jpg'; // Default image if not found in the images object
        const videoElement = `
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <img src="${imageUrl}" class="card-img-top" alt="${video.title}">
                    <div class="card-body">
                        <h5 class="card-title">${video.title}</h5>
                        <p class="card-text">${video.description}</p>
                        <p>Genre: ${video.genre}</p>
                        <p>Format: ${video.videoFormat}</p>
                        <p>Price: ${video.price}</p>
                        <p>Availability: ${video.availability}</p>
                        <button class="btn btn-primary add-to-cart" data-id="${video.videoId}" data-title="${video.title}" data-description="${video.description}" data-genre="${video.genre}" data-price="${video.price}" data-image="${imageUrl}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        videosContainer.append(videoElement);
    });
}
