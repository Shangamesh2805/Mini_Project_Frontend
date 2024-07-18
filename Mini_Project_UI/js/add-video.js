document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('videoForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const publisherId = localStorage.getItem('userId');
        const token = localStorage.getItem('token'); // Retrieve JWT token from local storage

        if (!publisherId) {
            alert('Publisher ID is missing. Please log in as a publisher.');
            return;
        }

        if (!token) {
            alert('JWT token is missing. Please log in.');
            return;
        }

        const videoData = {
            title: document.getElementById('title_field').value,
            price: parseFloat(document.getElementById('price_field').value),
            description: document.getElementById('description_field').value,
            genre: document.getElementById('genre_field').value,
            availability: document.getElementById('availability_field').value === 'true',
            videoFormat: document.getElementById('video_format_field').value,
            videoCount: parseInt(document.getElementById('video_count_field').value, 10),
            publisherId: parseInt(publisherId, 10)
        };

        fetch(`http://localhost:5177/api/Video/Add_Video`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(videoData)
        })  
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to add video');
            }
        })
        .then(data => {
            if (data.success) {
                alert('Video added successfully!');
                document.getElementById('videoForm').reset();
            } else {
                alert('Failed to add video');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while adding the video');
        });
    });
});
