<?php
require_once __DIR__ . "/controllers/authController.php";
require_once __DIR__ . "/controllers/passwordController.php";

$data = [
    "email"=>"Kevin@outlook.com",
    "password"=>"123"
];

//AuthController::login($conn, $data);
echo passwordController::generateHash($data['password']);

$hash = '$2y$10$G4PLe3xDbheu1OdH5ghMj.2G1PJUgsi6WC5BCgtanuPKhoAYCl9Qi';
echo "<br>";
echo passwordController::validateHash($data['password'], $hash);


echo password_hash('123', PASSWORD_BCRYPT);

echo "<br>";



echo password_verify('123',$hash);
echo "<br>";
echo var_dump( password_verify('124',$hash));
?>