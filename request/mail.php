<?php
$time = date('H:i:s');

//если мы не указваем заголовка запроса и посылаем джейсон как аксиос как через обьект а не через форму тогда нужно написать так 
$_POST = json_decode(file_get_contents('php://input'), true); //получаем массив с аксиос методом пост
var_dump($_POST);
$arr =  json_encode($_POST); //получаем можно вывести в js обьект
echo $arr;


//var_dump($_POST);
foreach ($_POST as $key => $value) {
  file_put_contents('mail.txt', "$value : $time\n", FILE_APPEND);
}

mail('sergeyberezovsky1981@gmail.com', 'My Subject', $_POST['user_name']);

//echo $data;
//echo $_POST['user_name'];
//echo json_encode($_POST);;