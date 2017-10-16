$ = require('jQuery');
var $homeboxError = $('.homebox__form-error');
var nameError = '<p aria-live="polite">What\'s your name!?</p>'; // Name Error text
var emailError = '<p aria-live="polite">Please enter a valid email address</p>'; // Email Error text
var messageError = '<p aria-live="polite">Please enter a message</p>'; // Message Error text
var timeError = '<p aria-live="polite">Too many submissions; wait 20 seconds, try again.</p>';
var name = $(".homebox__form input[name=name]").val();
var email = $(".homebox__form input[name=email]").val();
var message = $(".homebox__form textarea[name=message]").val();

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function homeboxCleanErrors() {
  $homeboxError.empty();
}

function homeboxError(error, clean) {
  if (clean == true) {
    homeboxCleanErrors();
  }
  $homeboxError.show().append(error);
}

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

$(document).ready(function() {
  $(".homebox__form").submit(function(event) {
    event.preventDefault();
    homeboxCleanErrors();
    
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
             homeboxError(emailError, true);
           } else if (data == 'Time Error'){
             homeboxLoader(false);
             homeboxError(timeError, true);
           }
        }
      });
    } else {
      homeboxCleanErrors();
      if (!name) {
        homeboxError(nameError, false);
      }
      if (!validateEmail(email)) {
        homeboxError(emailError, false);
      }
      if (!message) {
        homeboxError(messageError, false);
      }
    }
  });
});
