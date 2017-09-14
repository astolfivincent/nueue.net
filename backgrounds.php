<?php
  header('Access-Control-Allow-Origin: *');

  function random_image($dir) {
    $files = glob($dir . '/*.*');
    $file = array_rand($files);
    return $files[$file];
  }

  $myObj = Array(random_image('images/downloaded'));
  $myJSON = json_encode($myObj);
  $file = fopen('components/background/background.json','w+');
  fwrite($file, $myJSON);
  fclose($file);

  function gank_image($g,$a,$n,$k) {
    copy($n, $k.'image-'.rand($g, $a).'.jpg');
  }

  gank_image(0, 999999999,'https://unsplash.it/960/480/?random', 'images/downloaded/');
?>
