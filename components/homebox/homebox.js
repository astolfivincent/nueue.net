$ = require('jQuery');

$(document).ready(function() {
  $(".homebox__form").submit(function( event ) {
    event.preventDefault();
    var url = "/form-submissions.php";
    $.ajax({
      type: "POST",
      url: url,
      data: {name: name},
      success: function(data) {
         console.log(data);
      }
    });
  });
});
