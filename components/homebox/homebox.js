$ = require('jQuery');

$(document).ready(function() {
  $(".homebox__form").submit(function( event ) {
    event.preventDefault();
    var url = "/form-submissions.php";
    alert($(this).serialize());
    $.ajax({
      type: "POST",
      url: url,
      dataType: 'JSON',
      data: {name: 'names'},
      success: function(data) {
         alert(data);
      }
    });
  });
});
