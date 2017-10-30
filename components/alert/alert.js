$ = require('jquery');
function alertMessage(message) {
  var alert = $('<div>').addClass('alert').attr({
    'tabindex': '0',
    'aria-live': 'polite',
    'aria-role': 'alert'
  });
  var alerticon = $('<img>').addClass('alert__icon').attr({
    'src': '/images/alert.svg',
    'alt': 'Alert Icon'
  });
  var alertmessage = $('<div>').addClass('alert__message').html(message);
  alert.append(alerticon).append(alertmessage);
  $('body').prepend(alert);
}
