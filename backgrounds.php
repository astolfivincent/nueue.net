<?php
  header('Access-Control-Allow-Origin: *');

  function remote_file_size($url){
  	$data = get_headers($url, true);
  	if (isset($data['Content-Length']))
  	return (int) $data['Content-Length'];
  }

  function gank_image($g,$a,$n,$k) {
    $m = 100;
    $c = count($k);
    if (isset($a)){
      if($g >= $a) {
        $n = $n.rand(1, 99999999);
        if ($c < $m) {
          $v = $c + 1;
          $u = 'images/backgrounds/image-'. $v .'.jpg';
          copy($n, $u);
        } else {
          echo 'Reached maximum number of images: '.$m;
        }
      } else {
        return gank_image($g,$a,$n,$k);
      }
    }
  }

  $gank_opts = array(
    'filesize_max' => 70000, // Max filesize for image in bytes
    'url' => 'https://images.weserv.nl/?il&url=unsplash.it/960/480/?random&',
    'backgrounds' => glob('images/backgrounds' . '/*.*')
  );

  gank_image($gank_opts['filesize_max'], remote_file_size($gank_opts['url']), $gank_opts['url'], $gank_opts['backgrounds']);

?>
