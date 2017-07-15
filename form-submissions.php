<?php
$name = $_GET['name'];
$email = $_GET['email'];
$message = $_GET['message'];
$to = 'astolfivincent@gmail.com';
$subject = 'Contact Form Submission from '.$name;
$headers = 'From: vincent@nueue.net' . "\r\n" . 'Reply-To: '. $email . "\r\n" . 'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);

echo $name;
?>
