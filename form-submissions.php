<?php
$name = htmlspecialchars_decode($_GET['name']);
$email = htmlspecialchars_decode($_GET['email']);
$message = htmlspecialchars_decode($_GET['message']);
$to = 'astolfivincent@gmail.com';
$subject = 'Contact Form Submission from '.$name;
$headers = 'From: vincent@nueue.net' . "\r\n" . 'Reply-To: '. $email . "\r\n" . 'X-Mailer: PHP/' . phpversion();

if ($name && $email && $message) {
  mail($to, $subject, $message, $headers);
}

echo $name;
?>
