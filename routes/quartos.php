<?php

require_once __DIR__ . "/../controllers/quartoController.php";

// Supondo que $segments já esteja definido antes com explode("/", $_SERVER['REQUEST_URI']);
$method = $_SERVER['REQUEST_METHOD'];
$resource = $segments[3] ?? null; // Ex: 'quartos'
$param = $segments[2] ?? null;    // Pode ser 'disponiveis' ou o ID, dependendo do caso

switch ($method) {
    case "GET":
        if ($param === 'disponiveis') {
              $inicio = isset($_GET['inicio']) ? $_GET['inicio'] : null;
              $fim = isset($_GET['fim']) ? $_GET['fim'] : null;
              $qtd = isset($_GET['qtd']) ? $_GET['qtd'] : null;

            if ($inicio && $fim && $qtd) {
                $data = ['inicio' => $inicio, 'fim' => $fim, 'qtd' => $qtd];
                $resultados = quartoController::buscarDisponivel($conn, $data);
                jsonResponse(["message" => "quartos disponiveis",
                "data" => $resultados]);
            } else {
                jsonResponse(["message" => "Parâmetros 'inicio' e 'fim' são obrigatórios."], 400);
            }
         } elseif ($param) {
             quartoController::buscarPorid($conn, $param);
         } else {
             quartoController::listarTodos($conn);
        }
        break;

    case "DELETE":
        $id = $segments[2] ?? null;
        if ($id) {
            quartoController::deletar($conn, $id);
        } else {
            jsonResponse(["message" => "Id necessário!"], 400);
        }
        break;

    case "POST":
        $data = $_POST;
        $data['fotos'] = $_FILES['fotos'] ?? null;
        
        $data = json_decode(file_get_contents('php://input'), true);
        quartoController::criar($conn, $data);
        break;

    case "PUT":
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'] ?? null;
        if ($id) {
            quartoController::atualizar($conn, $id, $data);
        } else {
            jsonResponse(["message" => "Id necessário no corpo da requisição!"], 400);
        }
        break;

    default:
        jsonResponse([
            "status" => "erro",
            "message" => "Método não permitido"
        ], 405);
        break;
}