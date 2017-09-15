$ = require('jQuery');
$(document).ready(function() {
  function backgroundJSON(callback) {
    //$.getJSON( "http://nueue.net/components/background/background.json", function( data ) {
      $background = $('.background__image');
      $background.attr('src', 'images/backgrounds/image-299191331.jpg');
      callback();
    //});
  }

  backgroundJSON(function() {
    $('.background__image').addClass('background__image-unhide');
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
