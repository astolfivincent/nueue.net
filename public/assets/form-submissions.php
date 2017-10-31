<?php
$name = htmlspecialchars_decode($_POST['name']);
$email = htmlspecialchars_decode($_POST['email']);
$message = htmlspecialchars_decode($_POST['message']);
$to = 'astolfivincent@gmail.com';
$subject = 'Contact Form Submission from '.$name;
$headers = 'From: Nueue Contact <vincent@nueue.net>' . "\r\n" . 'Reply-To: '. $name .'<'. $email . "> \r\n" . 'X-Mailer: PHP/' . phpversion();

function storeDateTime() {
  $now = date('Y-m-d H:i:s');
  $saveDate = fopen('dateTime.json', 'w');
  fwrite($saveDate, json_encode($now));
  fclose($saveDate);
}

function checkDateTime() {
  $jsonDate = json_decode(file_get_contents('dateTime.json'), true);
  $then = date('Y-m-d H:i:s', strtotime('-20 seconds'));
  if (isset($jsonDate)) {
    if ($jsonDate < $then) {
      storeDateTime();
      return true;
    } else {
      return false;
    }
  } else {
    storeDateTime();
    return true;
  }
}

if (checkDateTime()) {
  if (isset($name) && filter_var($email, FILTER_VALIDATE_EMAIL) && isset($email) && isset($message)) {
    mail($to, $subject, $message, $headers);
    echo 'Submission Accepted';
  } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo 'Invalid Email';
  }
} else {
  echo 'Time Error';
}
?>
