$ = require('jQuery');
$(document).ready(function() {
  $.getJSON( "http://nueue.net/components/background/background.json", function( data ) {
    $bck = $('.background__image');
    $bck.attr('src', data[0]).addClass('background__image-unhide');
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
