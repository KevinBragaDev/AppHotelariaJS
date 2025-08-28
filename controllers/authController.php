<?php
require_once __DIR__ . "/../models/userModel.php";
require_once "passwordController.php";

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
                return jsonResponse([
                "id"=>$user['id'],
                "nome"=>$user['nome'],
                "email"=>$user['email'],
                "cargo_id"=>$user['cargos']
            
            ]);
        } else {
            return jsonResponse([
                "status"=>"erro","message"=>"Credenciais invalidas"],401);
        }
        
    }


}
?>