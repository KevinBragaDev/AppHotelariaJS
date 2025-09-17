<?php

require_once __DIR__ . "/../models/pedidoModel.php";

class pedidoController {
    public static function criar($conn, $data) {
        $result = pedidoModel::criar($conn, $data);
        if ($result) {
            return jsonResponse(['message'=>"pedido criado com sucesso"]);
        } else {
            return jsonResponse(['message'=>"erro ao criar o pedido"], 400);
        }
    }

    public static function listarTodos($conn){
        $roomList = pedidoModel::listarTodos($conn);
        return jsonResponse($roomList);
    }

    public static function buscarPorid($conn, $id){
        $buscId = pedidoModel::buscarPorid($conn, $id);
        return jsonResponse($buscId);
    }
}




?>