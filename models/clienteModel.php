<?php
require_once __DIR__."/../controllers/passwordController.php";

class clienteModel {
    public static function listarTodos($conn) {
         $sql = "SELECT * FROM clientes";
        $result = $conn->query($sql);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public static function buscarPorid($conn, $id){
        $sql = "SELECT * FROM clientes WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public static function criar($conn,$data) {
        $sql = "INSERT INTO clientes (nome,email,telefone,cpf,senha)
                VALUES (?, ?, ?, ?, ?);";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssss",
            $data["nome"],
            $data["email"],
            $data["telefone"],
            $data["cpf"],
            $data["senha"]
        );
        return $stmt->execute();
    }

    public static function atualizar($conn, $id, $data) {
        $sql = "UPDATE clientes SET nome = ?, email = ?,telefone = ?, cpf = ?, senha = ?, id_cargo = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssi", 
            $data["nome"],
            $data["email"],
            $data["telefone"],
            $data["cpf"],
            $data["senha"],
            $data["cargo"],
            $id
        );
        return $stmt->execute();
    }

    public static function deletar($conn, $id) {
        $sql = "DELETE FROM clientes WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    
    }

    public static function validateCliente($conn, $email, $password) {
        $sql = "SELECT c.id,c.nome,c.email,c.senha,cargos.nome AS cargos
	            FROM clientes as c JOIN cargos ON cargos.id = c.id_cargo WHERE c.email = ?";
        $stmt = $conn-> prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if($user = $result->fetch_assoc()) {
            if(PasswordController::validateHash($password,$user['senha'])) {
                unset($user['senha']);
                return $user;
            }
        }
        return false;
    }
}

?>