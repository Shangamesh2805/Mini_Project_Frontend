$(document).ready(function() {
    fetchVideos();
});

function fetchVideos() {
    $.ajax({
        url: "http://localhost:5177/api/Video/Get_AllVideos",
        method: "GET",
        headers: {
            Authorization: "Bearer YOUR_TOKEN_HERE" // Replace with actual token
        },
        success: function(data) {
            const videos = data; // Assuming the API response directly returns an array of videos
            displayVideos(videos);
        },
        error: function(error) {
            console.error("Error fetching videos:", error);
        }
    });
}

function displayVideos(videos) {
    const videosContainer = $("#videosContainer");
    videosContainer.empty();
    videos.forEach(video => {
        const videoElement = `
            <div class="video">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
                <p>Genre: ${video.genre}</p>
                <p>Format: ${video.videoFormat}</p>
                <p>Price: ${video.price}</p>
                <p>Availability: ${video.availability}</p>
                <button class="add-to-cart" data-id="${video.videoId}" data-title="${video.title}" data-description="${video.description}" data-genre="${video.genre}" data-price="${video.price}" data-image="image-url-here">Add to Cart</button>
            </div>
        `;
        videosContainer.append(videoElement);
    });
}

$(document).on('click', '.add-to-cart', function() {
    const videoId = $(this).data('id');
    const videoTitle = $(this).data('title');
    const videoDescription = $(this).data('description');
    const videoGenre = $(this).data('genre');
    const videoPrice = $(this).data('price');
    const videoImage = $(this).data('image');

    const cartItem = {
        id: videoId,
        title: videoTitle,
        description: videoDescription,
        genre: videoGenre,
        price: videoPrice,
        image: videoImage
    };

    let cart = localStorage.getItem('cart');
    if (cart) {
        cart = JSON.parse(cart);
    } else {
        cart = [];
    }

    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${videoTitle} has been added to your cart!`);
});

$('#logout-button').click(function() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = 'login.html';
});

$(document).ready(function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        $('.login').hide(); // Replace with actual class or ID of login/signup elements
        $('.logout').show(); // Replace with actual class or ID of logout elements
    } else {
        $('.login').show();
        $('.logout').hide();
    }
});