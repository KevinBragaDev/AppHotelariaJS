<?php

class UserModel {
    public static function validateUser($conn, $email, $password) {
        //$sql = "SELECT * FROM usuarios WHERE email = ?";
        $sql = "SELECT u.id,u.nome,u.email,u.senha,cargos.nome AS cargos
	            FROM usuarios as u JOIN cargos ON cargos.id = u.cargo_id WHERE u.email = ?";
        $stmt = $conn-> prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if($user = $result->fetch_assoc()) {
            if($user['senha'] === $password) {
                unset($user['senha']);
                return $user;
            }
        }
        return false;
    }
}



?> 