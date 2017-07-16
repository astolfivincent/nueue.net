<?php
$name = htmlspecialchars_decode($_POST['name']);
$email = htmlspecialchars_decode($_POST['email']);
$message = htmlspecialchars_decode($_POST['message']);
$to = 'astolfivincent@gmail.com';
$subject = 'Contact Form Submission from '.$name;
$headers = 'From: vincent@nueue.net' . "\r\n" . 'Reply-To: '. $email . "\r\n" . 'X-Mailer: PHP/' . phpversion();

if ($name && $email && $message) {
  mail($to, $subject, $message, $headers);
  echo 'Submission Accepted';
}
?>
