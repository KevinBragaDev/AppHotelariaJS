<?php
require_once __DIR__ . "/controllers/authController.php";
require_once __DIR__ . "/controllers/passwordController.php";
require_once __DIR__ . "/helpers/token_jwt.php";

$data = [
    "email"=>"Kevin@outlook.com",
    "password"=>"123"
];

// AuthController::login($conn, $data);
$tokenValido = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQYWdpbmFXZWIiLCJpYXQiOjE3NTY5MzAyNjcsImV4cCI6MTc1NjkzMzg2Nywic3ViIjp7ImlkIjozLCJub21lIjoiS2V2aW4iLCJlbWFpbCI6IktldmluQG91dGxvb2suY29tIiwiY2FyZ29zIjoiQXRlbmRlbnRlIn19.87kE3EvyLvJv6xC_Ks2UERLAWKyM4xhbSCHfOACZC7k";
echo var_dump(validateToken($tokenValido))


// $tokenInvalido = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQYWdpbmFXZWIiLCJpYXQiOjE3NTY5MjMzODcsImV4cCI6MTc1NjkyNjk4Nywic3ViIjp7ImlkIjozLCJub21lIjoiS2V2aW4iLCJlbWFpbCI6IktldmluQG91dGxvb2suY29tIiwiY2FyZ29zIjoiQXRlbmRlbnRlIn19.uXb5s1EkPpNXnw8cYVMKCXQPVXPbOFXL4IltBZRwZ4g';
// echo validateToken($tokenInvalido);

// echo passwordController::generateHash($data['password']);

// $hash = '$2y$10$G4PLe3xDbheu1OdH5ghMj.2G1PJUgsi6WC5BCgtanuPKhoAYCl9Qi';
// echo "<br>";
// echo passwordController::validateHash($data['password'], $hash);

// echo password_hash('123', PASSWORD_BCRYPT);

// echo "<br>";

// echo password_verify('123',$hash);
// echo "<br>";
// echo var_dump( password_verify('124',$hash));
?>