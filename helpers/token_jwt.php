<?php
require_once __DIR__ . "/jwt/jwt_include.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function createToken($user) {
    $payload = [
        "iss" => "PaginaWeb",
        "iat" => time(),
        "exp" => time() + (60 * (60 * 1)),
        "sub" => $user
    ];
    return JWT::encode($payload, SECRET_KEY, "HS256");
}

function validateToken($token) {
    try {
        $key = new Key(SECRET_KEY, "HS256");
        $decode = JWT::decode($token, $key);
        $result = json_decode(json_encode($decode->sub), true);
        return $result;
    } catch(Exception $error) {
        return false;
    }
}

function validateTokenAPI($typeRole) {
    $headers = getallheaders();
    if(!isset($headers["Authorization"])) {
        return jsonResponse(['message' => "Token ausente"], 401);
        exit;
    }

    $token = str_replace("Bearer ","", $headers["Authorization"]);
    $user = validateToken($token);
    if(!$user) {
        return jsonResponse(['message' => "Token invalido"], 401);
        exit;
    }
    //aqui vai a logica de validar o cargo
    if($user['cargos'] != $typeRole) {
        return jsonResponse(['message' => "Acesso negado"], 403);
        exit;
    }
    return $user;
}
?>