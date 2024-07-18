$(document).ready(function () {
  $("#registerForm").submit(function (event) {
    var fields = [
      { id: "name_field", errorId: "name_error" },
      { id: "age_field", errorId: "age_error" },
      { id: "email_field", errorId: "email_error" },
      { id: "password_field", errorId: "password_error" },
      { id: "role_field", errorId: "role_error" },
      { id: "membership_field", errorId: "membership_error" },
    ];

    fields.forEach(function (field) {
      $("#" + field.id).on("focus", function () {
        $("#" + field.errorId).hide();
      });
    });
    event.preventDefault();

    var valid = true;

    fields.forEach(function (field) {
      var value = $("#" + field.id).val();
      if (!value) {
        $("#" + field.errorId).show();
        valid = false;
      } else {
        $("#" + field.errorId).hide();
      }
    });

    if (!valid) {
      return;
    }

    var formData = {
      Id: 0, // Assuming Id is auto-generated in the backend
      Name: $("#name_field").val(),
      Age: parseInt($("#age_field").val(), 10),
      Email: $("#email_field").val(),
      Password: $("#password_field").val(),
      Role: $("#role_field").val(),
      Membership: $("#membership_field").val(),
    };

    $.ajax({
      type: "POST",
      url: "http://localhost:5177/api/Auth/register",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (response) {
        $("#successModal").modal("show");
        setTimeout(function () {
          window.location.href = "index.html";
        }, 2000); // Redirect after 2 seconds
      },
      error: function (xhr, status, error) {
        console.error("Registration error:", xhr.responseText);
        alert("Registration failed: " + xhr.responseText);
      },
    });
  });

//   $(".form-control").blur(function () {
//     if (!this.checkValidity()) {
//       $(this).addClass("is-invalid");
//     } else {
//       $(this).removeClass("is-invalid");
//     }
//   });
});
