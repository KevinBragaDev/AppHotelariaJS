<?php
    require_once "validateController.php";
    require_once __DIR__ . "/../models/orderModel.php";

    class orderController {
        public static function listarTodos($conn){

        }

        public static function buscarPorid($conn, $id){

        }

        public static function atualizar($conn, $id, $data){

        }

        public static function deletar($conn, $id){

        }

        public static function criar($conn, $data){

        }

        public static function createOrder($conn, $data) {
            $data['usuario_id'] = isset ($data['usuario_id']) ? $data ['usuario_id'] : null;

            validateController::validate_data($data, ["cliente_id", "pagamento", "quartos"]);

            foreach ($data["quartos"] as $index => $quarto) {
                validateController::validate_data($quarto, ["id", "inicio", "fim"]);
            }
            if(count($data['quartos']) == 0) {
                return jsonResponse(["message"=>'Nao existe reserva'],400);
            }
            //orderModel::crieateOrder($conn, $data);
        }
    }
?>