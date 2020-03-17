$ = require('jquery');
$(document).ready(function() {
  function backgroundRand(min, max) {
    return parseInt(Math.random() * (max - min)) + min;
  }
  function backgroundAjax(req) {
    $.ajax({
      type: 'POST',
      url: 'http://nueue.net/assets/backgrounds.php',
      data: {
        req: req
      }
    });
  }
  rand = Math.floor(backgroundRand(1,100));
  src = 'https://nueue.net/assets/images/backgrounds/image-' + rand + '.jpg';
  $background = $('.background__image');
  $background.on('load', function() {
    $background.addClass('background__image-unhide');
  });
  $background.attr('src', src);
});
