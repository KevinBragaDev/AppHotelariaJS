<?php
require_once __DIR__ ."/../controllers/orderController.php";


if ($_SERVER['REQUEST_METHOD'] === "GET") {
    $id = $segments[2] ?? null;

    if (isset($id)) {
        orderController::buscarPorid($conn, $id);
    } else {
        orderController::listarTodos($conn);
    }

} 

else if ($_SERVER['REQUEST_METHOD'] === "POST" ) {
    $opcao = $segments[2] ?? null;
    $data = json_decode( file_get_contents('php://input'), true);

    if ($opcao === "reserva") {
        orderController::createOrder($conn, $data);
    } else {
        orderController::criar($conn, $data);
    }
    
} else {
    jsonResponse([
    "status"=>"erro",
    "message"=>"Metodo não permitido"
    ], 405);
}
?>