$ = require('jQuery');

$(document).ready(function() {
  $(".homebox__form").submit(function( event ) {
    var name = $(this).child("input[name=name]");
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
