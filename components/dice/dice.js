$ = require('jquery');

$(document).ready(function() {
  $('.dice__roll').bind('click', function() {
    $.getJSON('https://wt-95013b9a0f89f6aeeb7319d2d8b1a80b-0.sandbox.auth0-extend.com/roll-dice', function(data) {
      console.log(JSON.parse(data.roll));
      for (i = 0; i <= JSON.parse(data.roll).length; i++) {
        $('.dice__die[data-did="' + i + '"]')
        .attr('data-dval', JSON.parse(data.roll)[i]);
      }
    });
  });
});
