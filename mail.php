<?php

$recepient = "taxi@yalta-yalta.ru";
$sitename = "yalta-yalta.ru";

$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$email = trim($_POST["email"]);
$price = trim($_POST["price"]);
$text = trim($_POST["text"]);
$message = "Имя: $name \nТелефон: $phone\nEmail: $email\nЦена $price";

$pagetitle = "Новая заявка с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
?>