$ = require('jQuery');
$(document).ready(function() {
  $.getJSON( "http://nueue.net/components/background/background.json", function( data ) {
    $bck = $('#background-image');
    $bck.attr('src', data[0]);
    $bck.on('load', function () {
      alert($('img.product_image').attr('src'));
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
