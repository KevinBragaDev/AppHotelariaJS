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

    public static function buscarPorid($conn, $id){
        $sql = "SELECT * FROM clientes WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public static function criar($conn) {
        $sql = "INSERT INTO clientes (nome,email,telefone,cpf,senha,id_cargo)
                VALUES (?, ?, ?, ?, ?, ?);";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssi",
            $data["nome"],
            $data["email"],
            $data["telefone"],
            $data["cpf"],
            $data["senha"],
            $data["cargo"]
        );
        return $stmt->execute();
    }

    public static function atualizar($conn) {
        $sql = "UPDATE clientes SET nome = ? email = ? telefone = ? cpf = ? senha = ? id_cargo = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssi", 
            $data["nome"],
            $data["numero"],
            $data["qtd_casal"],
            $data["qtd_solteiro"],
            $data["preco"],
            $data["disponivel"],
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
}

?>