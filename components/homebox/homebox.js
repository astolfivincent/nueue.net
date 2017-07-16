$ = require('jQuery');

$(document).ready(function() {
  $(".homebox__form").submit(function( event ) {
    event.preventDefault();
    var name = $(".homebox__form input[name=name]").val();
    var email = $(".homebox__form input[name=email]").val();
    var message = $(".homebox__form textarea[name=message]").val();
    var url = "/form-submissions.php";
    $.ajax({
      type: "POST",
      url: url,
      data: {
        name: name,
        email: email,
        message: message
      },
      success: function(data) {
         if (data == 'Submission Accepted') {
           $(this).hide();
           $('.homebox__form-message').toggleClass('homebox__form-message-show');
         }
      }
    });
  });
});
