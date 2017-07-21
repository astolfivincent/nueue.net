$ = require('jQuery');

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

$(document).ready(function() {
  $(".homebox__form").submit(function( event ) {
    event.preventDefault();
    var $homeboxError = $('.homebox__form-error');
    var nameError = '<p>What\'s your name!?</p>'; // Name Error text
    var emailError = '<p>Please enter a valid email address</p>'; // Email Error text
    var messageError = '<p>Please enter a message</p>'; // Message Error text
    var name = $(".homebox__form input[name=name]").val();
    var email = $(".homebox__form input[name=email]").val();
    var message = $(".homebox__form textarea[name=message]").val();

    if (validateEmail(email) && message && name) {
      $.ajax({
        type: "POST",
        url: '/form-submissions.php',
        data: {
          name: name,
          email: email,
          message: message
        },
        success: function(data) {
           if (data == 'Submission Accepted') {
             $(".homebox__form").hide();
             $('.homebox__form-message').toggleClass('homebox__form-message-show');
           } else if (data == 'Invalid Email') {
             $homeboxError.show().append(emailError);
           }
        }
      });
    } else {
      $homeboxError.empty();
      if (!name) {
        $homeboxError.show().append(nameError);
      }
      if (!validateEmail(email)) {
        $homeboxError.show().append(emailError);
      }
      if (!message) {
        $homeboxError.show().append(messageError);
      }
    }
  });
});
