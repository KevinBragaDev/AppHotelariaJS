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
            $data['usuario_id'] = isset ($data['usuario_id']) ? $data ['usuario_id'] : 1;

            validateController::validate_data($data, ["cliente_id", "pagamento", "quartos"]);

            foreach ($data["quartos"] as $quarto) {
                validateController::validate_data($quarto, ["id", "inicio", "fim"]);
                $quarto['inicio'] = validateController::fix_dateHour($quarto["inicio"], 14);
                $quarto['fim'] = validateController::fix_dateHour($quarto["fim"], 12);
            }
            if(count($data['quartos']) == 0) {
                return jsonResponse(["message"=>'Nao existe reserva'],400);

            } try {
                $resultado = orderModel::createOrder($conn, $data);
                return jsonResponse(["message"=> $resultado]);

            } catch (\Throwable $error) {
                return jsonResponse(["message"=>$error->getMessage()], 500);
            }
        }
    }
?>