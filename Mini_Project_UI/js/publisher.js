document.addEventListener('DOMContentLoaded', () => {
    const videoList = document.getElementById('videos-list');
    const editVideoModal = $('#editVideoModal');
    const editVideoForm = document.getElementById('edit-video-form');
    
    
    const fetchVideos = () => {
        fetch('http://localhost:5000/api/videos')
            .then(response => response.json())
            .then(videos => {
                videoList.innerHTML = '';
                videos.forEach(video => {
                    const videoCard = document.createElement('div');
                    videoCard.classList.add('col-xl-3', 'col-sm-6', 'mb-3');
                    videoCard.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${video.title}</h5>
                                <a href="${video.url}" target="_blank" class="btn btn-primary">Watch</a>
                                <button class="btn btn-warning edit-video" data-id="${video.id}" data-title="${video.title}" data-url="${video.url}">Edit</button>
                                <button class="btn btn-danger delete-video" data-id="${video.id}">Delete</button>
                            </div>
                        </div>
                    `;
                    videoList.appendChild(videoCard);
                });
            })
            .catch(error => console.error('Error fetching videos:', error));
    };

 
    const handleEditVideo = event => {
        event.preventDefault();
        const videoId = document.getElementById('video-id').value;
        const videoTitle = document.getElementById('video-title').value;
        const videoUrl = document.getElementById('video-url').value;

        fetch(`http://localhost:5000/api/videos/${videoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: videoTitle, url: videoUrl })
        })
        .then(response => response.json())
        .then(data => {
            fetchVideos();
            editVideoModal.modal('hide');
        })
        .catch(error => console.error('Error updating video:', error));
    };

  
    const handleDeleteVideo = videoId => {
        fetch(`http://localhost:5000/api/videos/${videoId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            fetchVideos();
        })
        .catch(error => console.error('Error deleting video:', error));
    };

   
    fetchVideos();

    
    videoList.addEventListener('click', event => {
        if (event.target.classList.contains('edit-video')) {
            const videoId = event.target.dataset.id;
            const videoTitle = event.target.dataset.title;
            const videoUrl = event.target.dataset.url;

            document.getElementById('video-id').value = videoId;
            document.getElementById('video-title').value = videoTitle;
            document.getElementById('video-url').value = videoUrl;

            editVideoModal.modal('show');
        }
        
        if (event.target.classList.contains('delete-video')) {
            const videoId = event.target.dataset.id;
            handleDeleteVideo(videoId);
        }
    });

    
    editVideoForm.addEventListener('submit', handleEditVideo);
});
