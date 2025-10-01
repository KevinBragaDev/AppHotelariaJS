<?php

require_once __DIR__ . "/../models/clienteModel.php";
require_once "authController.php";

class clienteController {
    public static function criar($conn, $data) {
        $login = [
            "email"=> $data["email"],
            "password"=> $data["senha"]
        ];
        $data['senha'] = passwordController::generateHash($data['senha']);
        $result = clienteModel::criar($conn, $data);
        if ($result) {
            authController::clienteLogin($conn, $login);
            $token = createToken()($result);

            return jsonResponse(['token'=> $token]);
        } else {
            return jsonResponse(['message'=>"erro ao criar o cliente"], 400);
        }
    }

    public static function listarTodos($conn){
        $roomList = clienteModel::listarTodos($conn);
        return jsonResponse($roomList);
    }

    public static function buscarPorid($conn, $id){
        $buscId = clienteModel::buscarPorid($conn, $id);
        return jsonResponse($buscId);
    }

    public static function deletar($conn, $id){
        $delet = clienteModel::deletar($conn, $id);
        if ($delet){
            return jsonResponse(['mesage'=>"cliente excluido com sucesso"]);
        }else{
            return jsonResponse(['mesage'=>"erro ao excluir"]);
        }
    }
    
    public static function atualizar($conn, $id, $data){
        $result = clienteModel:: atualizar($conn, $id, $data);
        if ($result){
            return jsonResponse(['mesage'=>"cliente atualizado com sucesso"]);
        }else{
            return jsonResponse(['mesage'=>"erro ao atualizar"]);
        }
    }
}




?>