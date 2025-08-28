<?php
class clienteModel {
    public static function listarTodos($conn, $email, $password) {
        $sql = "SELECT * FROM clientes = ?";
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

    public static function buscarPorid($conn){

    }

    public static function criar($conn) {

    }

    public static function atualizar($conn) {

    }

    public static function deletar($conn) {

    }
}

?>