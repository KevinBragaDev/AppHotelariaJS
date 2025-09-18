<?php
class reservaModel {
    public static function listarPorPedido($conn) {
        
    }

    public static function criar($conn,$data) {
        $sql = "INSERT INTO reservas (pedido_id, quarto_id, adicional_id, fim, inicio)
                VALUES (?, ?, ?, ?, ?);";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iiiss", 
            $data["pedidoID"],
            $data["quartoID"],
            $data["adicionalID"],
            $data["fim"],
            $data["inicio"]
        );
        return $stmt->execute();
    }

}
?>