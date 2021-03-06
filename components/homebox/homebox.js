$ = require('jquery');
var $homeboxError = $('.homebox__form-error');
var nameError = '<p data-error="0">What\'s your name!?</p>'; // Name Error text
var emailError = '<p data-error="1">Please enter a valid email address</p>'; // Email Error text
var messageError = '<p data-error="2">Please enter a message</p>'; // Message Error text
var timeError = '<p data-error="3">Too many submissions; wait 20 seconds, try again.</p>';

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function ariaInvalidate(e, b) {
  if (b) {
    e.attr('aria-invalid', 'true');
  } else {
    e.attr('aria-invalid', 'false');
  }
}

function homeboxCleanErrors() {
  $homeboxError.empty();
  $('.homebox__form-item').each(function() {
    ariaInvalidate($(this), false)
  });
}

function homeboxError(error, clean) {
  if (clean == true) {
    homeboxCleanErrors();
  }
  $homeboxError.show().append(error);
  $($homeboxError).find('p').each(function() {
    var errorCode = $(this).attr('data-error');
    ariaInvalidate($('.homebox__form-item[data-error="'+errorCode+'"]'), true);
  });
}

function homeboxLoader(b) {
  $homeboxFormSubmit = $('.homebox__form input[name=submit]');
  $homeboxFormLoader = $('.homebox__form-loader');
  if (b === true) {
    $homeboxFormSubmit.hide();
    $homeboxFormLoader.show().focus();
  } else {
    $homeboxFormLoader.hide();
    $homeboxFormSubmit.show().focus();
  }
}

$(document).ready(function() {
  $(".homebox__form").submit(function(event) {
    var name = $(".homebox__form input[name=name]").val();
    var email = $(".homebox__form input[name=email]").val();
    var message = $(".homebox__form textarea[name=message]").val();
    event.preventDefault();
    homeboxCleanErrors();

    if (validateEmail(email) && message && name) {
      homeboxLoader(true);
      homeboxCleanErrors();
      $.ajax({
        type: "POST",
        url: '/assets/form-submissions.php',
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
      $homeboxError.focus();
    }
  });
});
