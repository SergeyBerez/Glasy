<?php

/* https://api.telegram.org/bot815701197:AAFe0hRURtUFU2uRyZCcBvySA0XfQZ9Lndg/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

// $name = $_POST['user_name'];
// $phone = $_POST['user_phone'];
$email = $_POST['email'];
$token = "815701197:AAFe0hRURtUFU2uRyZCcBvySA0XfQZ9Lndg";
$chat_id = "-1001226162907";
$arr = array(
  // 'Имя пользователя: ' => $name,
  // 'Телефон: ' => $phone,
  'Email' => $email
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: thank-you.html');
} else {
  echo "Error";
}
?>