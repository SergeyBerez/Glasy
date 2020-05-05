<?php

/* https://api.telegram.org/bot815701197:AAFe0hRURtUFU2uRyZCcBvySA0XfQZ9Lndg/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

// $name = $_POST['user_name'];
// $phone = $_POST['user_phone'];
// $email = $_POST['email'];
// $token = "815701197:AAFe0hRURtUFU2uRyZCcBvySA0XfQZ9Lndg";
// $chat_id = "-1001226162907";
// $arr = array(
//   'Имя пользователя: ' => $name,
//   'Телефон: ' => $phone,
//   'Email' => $email
// );
// foreach ($arr as $key => $value) {
//     $txt .= "<b>" . $key . "</b> " . $value . "%0A";
// };
// $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");

// if ($sendToTelegram) {
//     header('Location: thank-you.html');
// } else {
//     echo "Error";
// }

/* https://api.telegram.org/bot815701197:AAFe0hRURtUFU2uRyZCcBvySA0XfQZ9Lndg/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$_POST = json_decode(file_get_contents('php://input'), true);
$name = trim($_POST['user_name']);
$phone = trim($_POST['user_phone']);
$email = trim($_POST['email']);
$date = date('Y-m-d H:i:s');
file_put_contents('app.txt', "||-name :$name  tel :$phone  email : $email  time :$date-||\n ", FILE_APPEND);
$token = "815701197:AAFe0hRURtUFU2uRyZCcBvySA0XfQZ9Lndg";
$chat_id = "-1001226162907";
$arr = array(
    'Имя пользователя: ' => $name,
    'Телефон: ' => $phone,
    'Email' => $email,
    'time' => $date,
);



foreach ($arr as $key => $value) {
    $txt .= "<b>$key</b>  $value %0A";
}
//$txt .= "<b>" . $key . "</b> " . $value . "%0A";
$sendToTelegram =
    fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");

// if ($sendToTelegram) {
//     echo "<b>" . $_POST['user_name'] . "</b><br> " . 'ваша заявка принята';
// } else {
//     echo "Error";
// }