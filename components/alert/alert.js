$ = require('jQuery');
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
$(document).ready(function() {
  if ($('body').attr('data-status') === '404') {
    alertMessage('<strong>404:</strong> Sorry, no page exists here. Maybe try another!');
  }
});
