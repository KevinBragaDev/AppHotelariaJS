<?php

    require_once __DIR__ . "/../controllers/reservaController.php";

    if ($_SERVER['REQUEST_METHOD'] === "GET") {
        $id = $segments[2] ?? null;

        if (isset($id)) {
            reservaController::buscarPorid($conn, $id);
        } else {
            reservaController::listarTodos($conn);
        }

    } else if ($_SERVER['REQUEST_METHOD'] === "DELETE") {
        $id = $segments[2] ?? null;

        if (isset($id)) {
            reservaController::deletar($conn, $id);
        } else {
            jsonResponse(["message"=>"Id necessario!"], 400);
        }

    } else if ($_SERVER['REQUEST_METHOD'] === "POST" ) {
        $data = json_decode( file_get_contents('php://input'), true);
        reservaController::criar($conn, $data);

    } else if ($_SERVER['REQUEST_METHOD'] === "PUT") {
        $data = json_decode( file_get_contents('php://input'), true);
        $id = $data['id'];
        reservaController::atualizar($conn, $id, $data);

    } else {
        jsonResponse([
        "status"=>"erro",
        "message"=>"Metodo não permitido"
        ], 405);
    }


?>