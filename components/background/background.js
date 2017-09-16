$ = require('jQuery');
$(document).ready(function() {
  function backgroundRand(min, max) {
    return parseInt(Math.random() * (max - min)) + min;
  }
  function backgroundAjax(req) {
    $.ajax({
      type: 'POST',
      url: 'http://nueue.net/backgrounds.php',
      data: {
        req: req
      },
      success: function(data) {
        console.log(data);
      }
    });
  }
  rand = Math.floor(backgroundRand(1,100));
  src = 'http://nueue.net/images/backgrounds/image-' + rand + '.jpg';
  $background = $('.background__image');
  $background.load(function() {
    $(this).addClass('background__image-unhide');
    backgroundAjax(0);
  });
  $background.attr('src', src);

  $('.background__curator').bind('click', function() {
    backgroundAjax(rand);
  });
});
