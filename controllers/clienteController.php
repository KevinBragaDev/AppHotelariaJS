<?php

require_once __DIR__ . "/../models/clienteModel.php";

class clienteController {
    public static function criar($conn, $data) {
        $data['senha'] = passwordController::generateHash($data['senha']);
        $result = clienteModel::criar($conn, $data);
        if ($result) {
            return jsonResponse(['message'=>"cliente criado com sucesso"]);
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

    public static function clienteLogin($conn, $data) {
        $data['email'] = trim($data['email']);
        $data['password'] = trim($data['password']);

        //confirmar se tem algum campo vazio
        if (empty($data['email']) || empty($data['password'])) {
            return jsonResponse([
                "status"=>"erro",
                "message"=>"Preencha todos os campos!!!"
            ],401);
        }

        $user = UserModel:: validateCliente($conn, $data['email'], $data ['password']);
            if ($user) {
                $token = createToken($user);
                return jsonResponse(["token" => $token]);
        } else {
            return jsonResponse([
                "status"=>"erro","message"=>"Credenciais invalidas"],401);
        }
    }
}




?>