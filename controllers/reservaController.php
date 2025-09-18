<?php

require_once __DIR__ . "/../models/reservaModel.php";

class reservaController {
    public static function criar($conn, $data) {
        $result = reservaModel::criar($conn, $data);
        if ($result) {
            return jsonResponse(['message'=>"reserva criado com sucesso"]);
        } else {
            return jsonResponse(['message'=>"erro ao criar o reserva"], 400);
        }
    }

    public static function listarTodos($conn){
        $roomList = reservaModel::listarTodos($conn);
        return jsonResponse($roomList);
    }

    public static function buscarPorid($conn, $id){
        $buscId = reservaModel::buscarPorid($conn, $id);
        return jsonResponse($buscId);
    }

    public static function deletar($conn, $id){
        $delet = reservaModel::deletar($conn, $id);
        if ($delet){
            return jsonResponse(['mesage'=>"reserva excluido com sucesso"]);
        }else{
            return jsonResponse(['mesage'=>"erro ao excluir"]);
        }
    }
    
    public static function atualizar($conn, $id, $data){
        $result = reservaModel:: atualizar($conn, $id, $data);
        if ($result){
            return jsonResponse(['mesage'=>"reserva atualizado com sucesso"]);
        }else{
            return jsonResponse(['mesage'=>"erro ao atualizar"]);
        }
    }
}




?>