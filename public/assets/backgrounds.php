<?php
$request = $_POST['req'];
$gank_opts = array(
  'filesize_max' => 70000, // Max filesize for image in bytes
  'files_max' => 100,
  'url' => 'https://images.weserv.nl/?il&url=unsplash.it/960/480/?random&',
  'backgrounds' => glob('images/backgrounds/*.*')
);

function gank_image($g,$a,$n,$k) {
  $c = count($k);
  $n = $n.rand(1, 99999999);
  if ($c < $a) {
    $v = $c + 1;
    $u = 'images/backgrounds/image-'. $v .'.jpg';
    copy($n, $u);
  }
}

if (isset($request) && is_numeric($request) && $request === '0') {
  gank_image($gank_opts['filesize_max'], $gank_opts['files_max'], $gank_opts['url'], $gank_opts['backgrounds']);
}
?>
