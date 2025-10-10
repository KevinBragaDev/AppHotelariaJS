<?php
require_once __DIR__ . "/../models/userModel.php";
require_once __DIR__ . "/../models/clienteModel.php";
require_once "passwordController.php";
require_once __DIR__ . "/../helpers/token_jwt.php";

class AuthController{
    public static function login($conn, $data) {
        $data['email'] = trim($data['email']);
        $data['password'] = trim($data['password']);

        //confirmar se tem algum campo vazio
        if (empty($data['email']) || empty($data['password'])) {
            return jsonResponse([
                "status"=>"erro",
                "message"=>"Preencha todos os campos!!!"
            ],401);
        }

        $user = UserModel:: validateUser($conn, $data['email'], $data ['password']);
            if ($user) {
                $token = createToken($user);
                return jsonResponse(["token" => $token]);
        } else {
            return jsonResponse([
                "status"=>"erro","message"=>"Credenciais invalidas"],401);
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

        $user = clienteModel::validateCliente($conn, $data['email'], $data ['password']);
            if ($user) {
                $token = createToken($user);
                return jsonResponse(["token" => $token]);
        } else {
            return jsonResponse([
                "status"=>"erro","message"=>"Credenciais invalidas"],401);
        }
    }









    
    // Nova função unificada que tenta ambos os tipos de login
    public static function universalLogin($conn, $data) {
        $data['email'] = trim($data['email']);
        $data['password'] = trim($data['password']);

        //confirmar se tem algum campo vazio
        if (empty($data['email']) || empty($data['password'])) {
            return jsonResponse([
                "status"=>"erro",
                "message"=>"Preencha todos os campos!!!"
            ],401);
        }

        // Tenta primeiro como cliente
        $user = clienteModel::validateCliente($conn, $data['email'], $data['password']);
        if ($user) {
            $token = createToken($user);
            return jsonResponse([
                "token" => $token,
                "userType" => "client",
                "user" => $user
            ]);
        }

        // Se não funcionou como cliente, tenta como employee
        $user = UserModel::validateUser($conn, $data['email'], $data['password']);
        if ($user) {
            $token = createToken($user);
            return jsonResponse([
                "token" => $token,
                "userType" => "employee", 
                "user" => $user
            ]);
        }

        // Se nenhum dos dois funcionou
        return jsonResponse([
            "status"=>"erro",
            "message"=>"Credenciais inválidas ou usuário não encontrado"
        ],401);
    }
}
?>