<?php
require_once "../config/database.php";
require_once "../controllers/authController.php";

$title = "home";
    //require_once 'utils/cabecalho.php';
    $data = [
        "email"=>"kevin@gmail.com",
        "password"=>"12345"
    ];

    AuthController::login($conn, $data);

  
?>
<h1>Teste</h1>

<?php
    require_once 'utils/rodape.php';
?>