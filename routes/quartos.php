<?php

    require_once __DIR__ . "/../controllers/quartoController.php";

    if ($_SERVER['REQUEST_METHOD'] === "GET") {
        $id = $segments[2] ?? null;
        
        if ($id === 'disponiveis') {
        $inicio = $_GET['inicio'] ?? null;
        $fim = $_GET['fim'] ?? null;

        if ($inicio && $fim) {
            $data = [
                'inicio' => $inicio,
                'fim' => $fim
            ];
            quartoController::buscarDisponivel($conn, $data);
            } else {
                jsonResponse(["message" => "Parâmetros 'inicio' e 'fim' são obrigatórios."], 400);
            }
        } else if (isset($id)) {
            quartoController::buscarPorid($conn, $id);
        } else {
            quartoController::listarTodos($conn);
        }
    }

    else if ($_SERVER['REQUEST_METHOD'] === "DELETE") {
        $id = $segments[2] ?? null;

        if (isset($id)) {
            quartoController::deletar($conn, $id);
        } else {
            jsonResponse(["message"=>"Id necessario!"], 400);
        }

    } else if ($_SERVER['REQUEST_METHOD'] === "POST" ) {
        $data = json_decode( file_get_contents('php://input'), true);
        quartoController::criar($conn, $data);

    } else if ($_SERVER['REQUEST_METHOD'] === "PUT") {
        $data = json_decode( file_get_contents('php://input'), true);
        $id = $data['id'];
        quartoController::atualizar($conn, $id, $data);

    } else {
        jsonResponse([
        "status"=>"erro",
        "message"=>"Metodo não permitido"
        ], 405);
    }


?>