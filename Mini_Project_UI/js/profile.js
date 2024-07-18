$(document).ready(function() {
    // Fetch user data when the document is loaded
    fetchUserData();

    function fetchUserData() {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }

        fetch(`http://localhost:5177/api/User/${userId}/User_Data`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            return response.json();
        })
        .then(user => {
            // Update DOM with user data
            document.getElementById('full_name').innerText = user.name;
            document.getElementById('email_address').innerText = user.email;
            document.getElementById('membership_type').innerText = user.membership;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    }
});
