$ = require('jQuery');
$(document).ready(function() {
  $.getJSON( "http://nueue.net/components/background/background.json", function( data ) {
    $('#background-image').attr('src', data[0]);
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
