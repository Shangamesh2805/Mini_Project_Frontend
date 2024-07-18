$(document).ready(function() {
    // Fetch all videos and store them in a map
    fetchAllVideos().then(videosMap => {
        // Fetch cart items and display them
        fetchCartItems(videosMap);
    });

    // Handle place order button click
    $('#place-order-button').click(function() {
        const cartTotal = parseFloat(localStorage.getItem('cartTotal'));
        if (!cartTotal || cartTotal === 0) {
            console.error("Cart total is missing or zero. Please ensure you have items in your cart.");
            // Optionally, display a message to the user or prevent navigation
            return;
        }
        window.location.href = 'place-order.html';
    });
});

// Function to fetch all videos and return a map of videoId to video data
function fetchAllVideos() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error("No token found. Please log in.");
        return Promise.reject("No token found.");
    }

    return $.ajax({
        url: "http://localhost:5177/api/Video/Get_AllVideos",
        method: "GET",
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(data => {
        const videos = data['$values'];
        const videosMap = {};
        videos.forEach(video => {
            videosMap[video.videoId] = video;
        });
        return videosMap;
    }).catch(error => {
        console.error("Error fetching videos:", error);
        return {};
    });
}

// Function to fetch cart items from the API
function fetchCartItems(videosMap) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error("No token found. Please log in.");
        return;
    }

    $.ajax({
        url: "http://localhost:5177/GetCart",
        method: "GET",
        headers: {
            Authorization: "Bearer " + token
        },
        success: function(response) {
            const cartItems = response.items['$values'];
            displayCartItems(cartItems, videosMap);
        },
        error: function(error) {
            console.error("Error fetching cart items:", error);
        }
    });
}

// Function to display cart items
function displayCartItems(cartItems, videosMap) {
    const cartItemsContainer = $("#cart-items");
    cartItemsContainer.empty();
    cartItems.forEach(item => {
        const video = videosMap[item.videoId];
        const price = video ? video.price : 0;
        const imageUrl = `images/products/${item.videoId}.jpg`;
        const cartItemElement = `
            <div class="col-md-12">
                <div class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${imageUrl}" class="card-img" alt="${item.videoTitle}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${item.videoTitle}</h5>
                                <p class="card-text">Quantity: 
                                    <input type="number" class="form-control quantity-input" value="${item.quantity}" min="1" data-id="${item.videoId}">
                                </p>
                                <p class="card-text">Price: $<span class="price" data-price="${price}">${price}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        cartItemsContainer.append(cartItemElement);
    });

    // Attach event listeners for quantity changes
    $(".quantity-input").change(function() {
        const videoId = $(this).data('id');
        const newQuantity = $(this).val();
        updateCartItem(videoId, newQuantity, videosMap);
    });

    // Calculate and display the total price
    calculateTotalPrice(cartItems, videosMap);
}

// Function to update the cart item quantity
function updateCartItem(videoId, newQuantity, videosMap) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error("No token found. Please log in.");
        return;
    }

    const data = {
        videoId: videoId,
        quantity: parseInt(newQuantity)
    };

    $.ajax({
        url: "http://localhost:5177/UpdateCartItem",
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data),
        success: function(response) {
            // Recalculate total price after updating cart item
            fetchCartItems(videosMap);
        },
        error: function(error) {
            console.error("Error updating cart item:", error);
        }
    });
}

// Function to calculate the total price of the cart
function calculateTotalPrice(cartItems, videosMap) {
    let total = 0;
    cartItems.forEach(item => {
        const video = videosMap[item.videoId];
        const price = video ? video.price : 0;
        total += item.quantity * price;
    });
    // Store cart total in localStorage for use in other pages
    localStorage.setItem('cartTotal', total.toFixed(2));
    $('#cart-total').text(total.toFixed(2));
}
