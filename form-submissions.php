<?php
$name = htmlspecialchars_decode($_POST['name']);
$email = htmlspecialchars_decode($_POST['email']);
$message = htmlspecialchars_decode($_POST['message']);
$to = 'astolfivincent@gmail.com';
$subject = 'Contact Form Submission from '.$name;
$headers = 'From: Nueue Contact <vincent@nueue.net>' . "\r\n" . 'Reply-To: '. $name .'<'. $email . "> \r\n" . 'X-Mailer: PHP/' . phpversion();

if (isset($name) && isset($email) && isset($message)) {
  mail($to, $subject, $message, $headers);
  echo 'Submission Accepted';
}
?>
