$(document).ready(function() {
    // Fetch order details when the document is loaded
    fetchOrderDetails();

    function fetchOrderDetails() {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }

        fetch(`http://localhost:5177/api/Orders/GetOrder/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch order details');
            }
            return response.json();
        })
        .then(data => {
            // Render each order item in a card format
            const orderListContainer = $('#order-list');
            data.$values.forEach(order => {
                const orderCard = `
                    <div class="col-md-6 col-lg-4 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Order ID: ${order.orderId}</h5>
                                <p class="card-text"><b>Order Date:</b> ${new Date(order.orderDate).toLocaleDateString()}</p>
                                <p class="card-text"><b>Rental Expire Date:</b> ${new Date(order.rentalExpireDate).toLocaleDateString()}</p>
                                <p class="card-text"><b>Total Amount:</b> $${order.totalAmount}</p>
                                <p class="card-text"><b>Video ID:</b> ${order.orderDetails.$values[0].videoId}</p>
                                
                            </div>
                        </div>
                    </div>`;
                orderListContainer.append(orderCard);
            });
        })
        .catch(error => {
            console.error('Error fetching order details:', error);
        });
    }
});
