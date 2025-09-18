<?php
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
}

?>