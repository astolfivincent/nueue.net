$ = require('jQuery');

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

$(document).ready(function() {
  $(".homebox__form").submit(function(event) {
    event.preventDefault();
    var $homeboxError = $('.homebox__form-error');
    var nameError = '<p aria-live="polite">What\'s your name!?</p>'; // Name Error text
    var emailError = '<p aria-live="polite">Please enter a valid email address</p>'; // Email Error text
    var messageError = '<p aria-live="polite">Please enter a message</p>'; // Message Error text
    var name = $(".homebox__form input[name=name]").val();
    var email = $(".homebox__form input[name=email]").val();
    var message = $(".homebox__form textarea[name=message]").val();

    function homeboxLoader(b) {
      $homeboxFormSubmit = $('.homebox__form input[name=submit]');
      $homeboxFormLoader = $('.homebox__form-loader');
      if (b === true) {
        $homeboxFormSubmit.hide();
        $homeboxFormLoader.show();
      } else {
        $homeboxFormSubmit.show();
        $homeboxFormLoader.hide();
      }
    }

    if (validateEmail(email) && message && name) {
      homeboxLoader(true);
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
             homeboxLoader(false);
             $homeboxError.show().append(emailError);
           } else {
             console.log(data);
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
