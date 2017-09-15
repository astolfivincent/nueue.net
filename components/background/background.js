$ = require('jQuery');
$(document).ready(function() {
  $.getJSON( "http://nueue.net/components/background/background.json", function( data ) {
    $bck = $('#background-image');
    $bck.attr('src', data[0]);
    $bck.on('data-attribute-changed', function () {
      $(this).on('load', function() {
        console.log($(this).attr('src'));
      });
    });
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
