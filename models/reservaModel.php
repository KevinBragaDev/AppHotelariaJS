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

   
    public static function isQuartoDisponivel($conn, $quarto_id, $inicio, $fim) {
        $sql = "SELECT COUNT(*) as conflitos 
                FROM reservas 
                WHERE quarto_id = ? 
                AND (
                    (inicio <= ? AND fim > ?) OR 
                    (inicio < ? AND fim >= ?) OR 
                    (inicio >= ? AND fim <= ?)
                )";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("issssss", 
            $quarto_id,
            $fim, $inicio,      
            $inicio, $fim,      
            $inicio, $fim       
        );
        
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        
        
        return $row['conflitos'] == 0;
    }

}
?>