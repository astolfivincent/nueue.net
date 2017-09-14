$ = require('jQuery');
$(document).ready(function() {
  function newBackground(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  var base64 = newBackground('https://unsplash.it/960/480/?random', function(image) {
    return image;
  });

  $.ajax({
    type: "POST",
    url: 'http://nueue.net/backgrounds.php',
    data: {
      requesting: 1,
      base64: base64,
    },
    success: function(data) {
      console.log(data);
    }
  });
});
