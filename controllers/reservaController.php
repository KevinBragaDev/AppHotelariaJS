<?php

require_once __DIR__ . "/../models/reservaModel.php";
require_once "validateController";
class reservaController {
    public static function criar($conn, $data) {
        validateController::validate_data($data,["pedido_id", "quarto_id", "adicional_id", "inicio", "fim"])

        $data["inicio"] = validateController::fix_datehour($data["inicio",14])
        $data["fim"] = validateController::fix_datehour($data["fim",12])

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