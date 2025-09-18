<?php
class adicionalModel {
    public static function listarTodos($conn) {
        $sql = "SELECT * FROM adicionais";
        $result = $conn->query($sql);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public static function buscarPorid($conn, $id){
        $sql = "SELECT * FROM adicionais WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public static function criar($conn, $data) {
        $sql = "INSERT INTO adicionais (nome, preco)
                VALUES (?, ?);";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sd", 
            $data["nome"],
            $data["preco"]
        );
        return $stmt->execute();
    }

    public static function atualizar($conn, $id, $data) {
        $sql = "UPDATE adicionais SET nome = ?, preco = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssi", 
            $data["nome"],
            $data["preco"],
            $id
        );
        return $stmt->execute();
    }

    public static function deletar($conn, $id) {
        $sql = "DELETE FROM adicionais WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
} 

?>