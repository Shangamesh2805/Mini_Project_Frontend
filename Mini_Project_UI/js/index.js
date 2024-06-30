$(document).ready(function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        $('#login-button').hide();
        $('#signup-button').hide();
        $('#profile-button').show();
    }

    fetch('/api/videos')
        .then(response => response.json())
        .then(videos => {
            const productsContainer = $('#products');
            videos.forEach(video => {
                const videoCard = `
                    <div class="col-md-4">
                        <div class="card">
                            <img src="${video.VideoImageUrl}" class="card-img-top" alt="${video.Title}">
                            <div class="card-body">
                                <h5 class="card-title">${video.Title}</h5>
                                <p class="card-text">${video.Description}</p>
                                <p class="card-text">Genre: ${video.Genre}</p>
                                <p class="card-text">Price: $${video.Price}</p>
                                <a href="video-details.html?id=${video.VideoId}" class="btn btn-primary">View Details</a>
                                <button class="btn btn-secondary add-to-cart" 
                                        data-id="${video.VideoId}" 
                                        data-title="${video.Title}" 
                                        data-description="${video.Description}" 
                                        data-genre="${video.Genre}" 
                                        data-price="${video.Price}" 
                                        data-image="${video.VideoImageUrl}">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>`;
                productsContainer.append(videoCard);
            });
        })
        .catch(error => console.error('Error fetching videos:', error));
    
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
});
