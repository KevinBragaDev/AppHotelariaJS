<?php
require_once "quartoModel.php";

class orderModel {
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
            $data["usuario_id"],
            $data["cliente_id"],
            $data["pagamento"]
        );
        return $stmt->execute();
        if ($resultado){
            return $conn->insert_id;
        }
        return false;
    }

    public static function createOrder($conn, $data) {
        $cliente_id = $data ['cliente_id'];
        $pagamento = $data ['pagamento'];
        $usuario_id = isset($data ['usuario_id']);
        $reservas = [];
        $reservou = false;

        $conn->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);

        try {
            $order_id = self::create($conn, [
                "usuario_id"=> $usuario_id,
                "cliente_id"=> $pagamento,
                "pagamento"=> $pagamento
            ]);
            if(!$order_id) {
                throw new RuntimeException("Erro ao criar o pedido.");
            }

            foreach($data['quartos'] as $quarto){
                $id = $quarto['id'];
                $inicio = $quarto['inicio'];
                $fim = $quarto['fim'];

                if ( !quartoModel::blockById($conn,$id) ) {
                    $reservas[] = "quarto {$id} indisponivel";
                    continue;
                }
                /*criar um metodo na classe ReservaModel
                para avaliar se o quarto esta disponivel
                no intervalo de datas
                reservaModel::isConflict(); */
                $reserverResult = reservaModel::create($conn,[
                    "pedidoID" => $order_id,
                    "quartoID" => $id,
                    "adicionalID" => null,
                    "fim" => $fim,
                    "inicio" => $inicio;
                ]);
                $reservou = true;
                $reservas[] = [
                    "reserva_id" =>$order_id,
                    "reservas"=> $reservas,
                    "message"
                ]

            }
        } catch (\Throwable $th) {
            try {
                $conn->rollback();
            } catch (\Throwable $th2) {
            throw $th;
            }
        }
    }
}


?>