<?php

require_once __DIR__ . "/../models/quartoModel.php";

class QuartoController {
    public static function criar($conn, $data) {
        $result = quartoModel::criar($conn, $data);
        if ($result) {
            return jsonResponse(['message'=>"quarto criado com sucesso"]);
        } else {
            return jsonResponse(['message'=>"erro ao criar o quarto"], 400);
        }
    }

    public static function listarTodos($conn){
        $roomList = quartoModel::listarTodos($conn);
        return jsonResponse($roomList);
    }

    public static function buscarPorid($conn, $id){
        $buscId = quartoModel::buscarPorid($conn, $id);
        return jsonResponse($buscId);
    }

    public static function deletar($conn, $id){
        $delet = quartoModel::deletar($conn, $id);
        if ($delet){
            return jsonResponse(['mesage'=>"quarto excluido com sucesso"]);
        }else{
            return jsonResponse(['mesage'=>"erro ao excluir"]);
        }
    }
    
    public static function atualizar($conn, $id, $data){
        $result = quartoModel:: atualizar($conn, $id, $data);
        if ($result){
            return jsonResponse(['mesage'=>"quarto atualizado com sucesso"]);
        }else{
            return jsonResponse(['mesage'=>"erro ao atualizar"]);
        }
    }
    public static function buscarDisponivel($conn,$data) {
        $buscDisp = quartoModel:: buscarDisponiveis($conn,$data);
        if ($buscDisp !== false && !empty($resultado)) {
            return jsonResponse(['mesage'=>"quartos Disponiveis", 'data'=> $resultado]);
        } else {
            return jsonResponse(['mesage'=>"erro ao buscar quartos disponiveis"],404);
        }
    }
}




?>