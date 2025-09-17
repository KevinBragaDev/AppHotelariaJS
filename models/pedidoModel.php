<?php
class pedidoModel {
    public static function listarTodos($conn) {
        $sql = "SELECT * FROM pedidos";
        $result = $conn->query($sql);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public static function buscarPorid($conn, $id){
         $sql = "SELECT * FROM pedidos WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    
    }

    public static function criar($conn) {
        $sql = "INSERT INTO pedidos (usuario_id, cliente_id, pagamento)
                VALUES (?, ?, ?);";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iis",
            $data["usuario"],
            $data["cliente"],
            $data["pagamento"]
        );
        return $stmt->execute();
    }

}


?>