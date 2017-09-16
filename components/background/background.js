$ = require('jQuery');
$(document).ready(function() {
  function getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min)) + min;
  }
  rand = Math.floor(getRandomArbitrary(1,100));
  src = 'images/backgrounds/image-' + rand + '.jpg';
  $background = $('.background__image');
  $background.load(function() {
    $(this).addClass('background__image-unhide');
  });
  $background.attr('src', src);

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
