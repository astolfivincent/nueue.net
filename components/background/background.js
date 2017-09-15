$ = require('jQuery');
$(document).ready(function() {
  $.getJSON( "http://nueue.net/components/background/background.json", function( data ) {
    $background = $('.background__image');
    $background.load(function() {
      $(this).addClass('background__image-unhide');
    });
    $background.attr('src', data[0]);
  });

  $.ajax({
    type: "POST",
    url: 'http://nueue.net/backgrounds.php',
    data: {
      requesting: 1
    },
    success: function(data) {
      console.log(data);
    }
  });
});
