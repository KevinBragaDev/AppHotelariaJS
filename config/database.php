<?php
require_once 'config.php';
//  $conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_BANCO);
  
$erroDB = false;
try {
  $conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_BANCO);
  if($conn->connect_error){
    $erroDB = true;
  }

}catch (mysqli_sql_exception $erro){
  $erroDB = true;
}

?>