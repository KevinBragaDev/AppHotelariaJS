<?php

    require_once __DIR__ . "/../controllers/pedidoController.php";

    if ($_SERVER['REQUEST_METHOD'] === "GET") {
        $id = $segments[2] ?? null;

        if (isset($id)) {
            pedidoController::buscarPorid($conn, $id);
        } else {
            pedidoController::listarTodos($conn);
        }

    } 

      else if ($_SERVER['REQUEST_METHOD'] === "POST" ) {
        $data = json_decode( file_get_contents('php://input'), true);
        pedidoController::criar($conn, $data);

    } else {
        jsonResponse([
        "status"=>"erro",
        "message"=>"Metodo não permitido"
        ], 405);
    }


?>