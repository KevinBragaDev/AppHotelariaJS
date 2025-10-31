<?php

    require_once __DIR__ . "/../controllers/clienteController.php";
    require_once __DIR__ . "/../helpers/token_jwt.php";
    if ($_SERVER['REQUEST_METHOD'] === "GET") {
        validateTokenAPI('Atendente');
        $id = $segments[2] ?? null;

        if (isset($id)) {
            clienteController::buscarPorid($conn, $id);
        } else {
            clienteController::listarTodos($conn);
        }

    } else if ($_SERVER['REQUEST_METHOD'] === "DELETE") {
        validateTokenAPI('Atendente');
        $id = $segments[2] ?? null;

        if (isset($id)) {
            clienteController::deletar($conn, $id);
        } else {
            jsonResponse(["message"=>"Id necessario!"], 400);
        }

    } else if ($_SERVER['REQUEST_METHOD'] === "POST" ) {
        validateTokenAPI('Atendente');
        $data = json_decode( file_get_contents('php://input'), true);
        clienteController::criar($conn, $data);

    } else if ($_SERVER['REQUEST_METHOD'] === "PUT") {
        validateTokenAPI('Admin');
        $data = json_decode( file_get_contents('php://input'), true);
        $id = $data['id'];
        clienteController::atualizar($conn, $id, $data);

    } else {
        jsonResponse([
        "status"=>"erro",
        "message"=>"Metodo não permitido"
        ], 405);
    }


?>