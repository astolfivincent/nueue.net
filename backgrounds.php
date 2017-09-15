<?php
  header('Access-Control-Allow-Origin: *');
  $images = glob('images/backgrounds' . '/*.*');
  $rand_opts = array(
    'rand_min' => 0,
    'rand_max' => 999999999,
  );
  $gank_opts = array(
    'url' => 'https://images.weserv.nl/?il&url=unsplash.it/960/480/?random&'.rand($rand_opts['rand_min'], $rand_opts['rand_max']),
    'backgrounds' => $images
  );

  function random_image($files) {
    $file = array_rand($files);
    return $files[$file];
  }

  function set_next_background($url) {
    $url = Array($url);
    $json = json_encode($url);
    $file = fopen('components/background/background.json','w+');
    fwrite($file, $json);
    fclose($file);
  }

  function gank_image($g,$a,$n,$k) {
    if (count($k) < 100) {
      $r = rand($g, $a);
      $u = 'images/backgrounds/image-'.$r.'.jpg';
      copy($n, $u);
      return $u;
    }
  }

  set_next_background(random_image($gank_opts['backgrounds']));
  gank_image($rand_opts['rand_min'], $rand_opts['rand_max'], $gank_opts['url'], $gank_opts['backgrounds']);

?>
