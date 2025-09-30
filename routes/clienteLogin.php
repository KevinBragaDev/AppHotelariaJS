<?php
require_once __DIR__ ."/../controllers/clienteController.php";

if ($_SERVER['REQUEST_METHOD'] === "POST" ) {
    $data = json_decode(file_get_contents('php://input'), true);
    clienteController::clienteLogin($conn, $data);
} else {
    jsonResponse([
        'status'=>"Erro",
        'message'=>'Método não permitido'
    ], 405);
}
?>