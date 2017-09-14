<?php
$requesting = $_POST['requesting'];
if (isset($requesting) && $requesting === 1) {
  echo $requesting;
}
/*
imageinterlace($image, true);
imagejpeg($image, 'new.jpg');
imagedestroy($image);
*/
?>
