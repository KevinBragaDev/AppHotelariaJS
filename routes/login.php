<?php
require_once __DIR__ ."/../controllers/authController.php";

if ($_SERVER['REQUEST_METHOD'] === "POST" ) {
    $opcao = $segments[2] ?? null;
    $data = json_decode(file_get_contents('php://input'), true);

    if ($opcao === "client") {
        AuthController::clienteLogin($conn, $data);
    }
    else if ($opcao ==="employee"){
        AuthController::login($conn, $data);
    } else {
        jsonResponse(['status' => 'erro', 
        'message' => 'rota nao existe'], 405);
    }

} else {
    jsonResponse([
        'status'=>"Erro",
        'message'=>'Método não permitido'
    ], 405);
}
?>