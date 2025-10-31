<?php

    require_once __DIR__ . "/../controllers/adicionalController.php";

    if ($_SERVER['REQUEST_METHOD'] === "GET") {
        $id = $segments[2] ?? null;

        if (isset($id)) {
            adicionalController::buscarPorid($conn, $id);
        } else {
            adicionalController::listarTodos($conn);
        }

    } else if ($_SERVER['REQUEST_METHOD'] === "DELETE") {
        $id = $segments[2] ?? null;
        
        if (isset($id)) {
            adicionalController::deletar($conn, $id);
        } else {
            jsonResponse(["message"=>"Id necessario!"], 400);
        }

    } else if ($_SERVER['REQUEST_METHOD'] === "POST" ) {
        validateTokenAPI('Atendente');
        $data = json_decode( file_get_contents('php://input'), true);
        adicionalController::criar($conn, $data);

    } else if ($_SERVER['REQUEST_METHOD'] === "PUT") {
        $data = json_decode( file_get_contents('php://input'), true);
        $id = $data['id'];
        adicionalController::atualizar($conn, $id, $data);

    } else {
        jsonResponse([
        "status"=>"erro",
        "message"=>"Metodo não permitido"
        ], 405);
    }


?>