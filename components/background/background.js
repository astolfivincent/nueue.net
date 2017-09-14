$ = require('jQuery');
$(document).ready(function() {
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
