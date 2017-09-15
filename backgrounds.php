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
    $r = rand($g, $a);
    copy($n, $k.'image-'.$r.'.jpg');
    return $k.'image-'.$r.'.jpg';
  }

  gank_image(0, 999999999,'https://images.weserv.nl/?il&url=unsplash.it/960/480/?random', 'images/downloaded/');

?>
