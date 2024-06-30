$(document).ready(function() {
    $('#registerForm').submit(function(event) {
        event.preventDefault();

        if (this.checkValidity() === false) {
            event.stopPropagation();
            this.classList.add('was-validated');
            return;
        }

        var formData = {
            Id: 0, // Assuming Id is auto-generated in the backend
            Name: $('#name_field').val(),
            Age: parseInt($('#age_field').val(), 10),
            Email: $('#email_field').val(),
            Password: $('#password_field').val(),
            Role: $('#role_field').val(),
            Membership: $('#membership_field').val()
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:5177/api/Auth/register',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                $('#successModal').modal('show');
                setTimeout(function() {
                    window.location.href = 'index.html';
                }, 2000); // Redirect after 2 seconds
            },
            error: function(xhr, status, error) {
                console.error('Registration error:', xhr.responseText);
                alert('Registration failed: ' + xhr.responseText);
            }
        });
    });

    $('.form-control').blur(function() {
        if (!this.checkValidity()) {
            $(this).addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid');
        }
    });
});
