<?php

require_once __DIR__ . "/../models/adicionalModel.php";

class AdicionalController {
    public static function criar($conn, $data) {
        $result = adicionalModel::criar($conn, $data);
        if ($result) {
            return jsonResponse(['message'=>"adicional criado com sucesso"]);
        } else {
            return jsonResponse(['message'=>"erro ao criar o adicional"], 400);
        }
    }

    public static function listarTodos($conn){
        $roomList = adicionalModel::listarTodos($conn);
        return jsonResponse($roomList);
    }

    public static function buscarPorid($conn, $id){
        $buscId = adicionalModel::buscarPorid($conn, $id);
        return jsonResponse($buscId);
    }

    public static function deletar($conn, $id){
        $delet = adicionalModel::deletar($conn, $id);
        if ($delet){
            return jsonResponse(['mesage'=>"adicional excluido com sucesso"]);
        }else{
            return jsonResponse(['mesage'=>"erro ao excluir"]);
        }
    }
    
    public static function atualizar($conn, $id, $data){
        $result = adicionalModel:: atualizar($conn, $id, $data);
        if ($result){
            return jsonResponse(['mesage'=>"adicional atualizado com sucesso"]);
        }else{
            return jsonResponse(['mesage'=>"erro ao atualizar"]);
        }
    }
}




?>