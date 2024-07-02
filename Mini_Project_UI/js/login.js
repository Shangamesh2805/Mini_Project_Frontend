$(document).ready(function() {
    $('#login-form').submit(function(e) {
        e.preventDefault();
        
        const email = $('#email').val();
        const password = $('#password').val();

        $.ajax({
            url: 'http://localhost:5177/api/Auth/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ Email: email, Password: password }),
            success: function(response) {
                alert('Login successful!');
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('token', response.token);
                localStorage.setItem('userId', response.userId);
                localStorage.setItem('role', response.role);
                window.location.href = 'index.html';
            },
            error: function(error) {
                alert('Login failed: ' + error.responseText);
            }
        });
    });
});
