<?php

require_once __DIR__ . "/../models/quartoModel.php";
require_once __DIR__ . "/../models/PhotoModel.php";
require_once "ValidateController.php";
require_once "UploadController.php";

class QuartoController {
    public static function criar($conn, $data) {
         ValidateController::validate_data($data, ["nome", "numero", "qnt_cama_casal", "qnt_cama_solteiro", "preco", "disponivel"]);
         $result = quartoModel::criar($conn, $data);
        if ($result) {
            if ($data['fotos']){
                $pictures = UploadController::upload($data['fotos']);
                foreach ($pictures ['saves'] as $name){
                    $id_photo = PhotoModel::create($conn, $name);
                    if($id_photo){
                    PhotoModel::createRelationRoom($conn, $result, $id_photo);
                    }
                }
            }
            return jsonResponse(['message'=>"quarto criado com sucesso"]);
        } else {
            return jsonResponse(['message'=>"erro ao criar o quarto"], 400);
        }
    }

    public static function listarTodos($conn){
        $roomList = quartoModel::listarTodos($conn);
        return jsonResponse($roomList);
    }

    public static function buscarPorid($conn, $id){
        $buscId = quartoModel::buscarPorid($conn, $id);
        return jsonResponse($buscId);
    }

    public static function deletar($conn, $id){
        $delet = quartoModel::deletar($conn, $id);
        if ($delet){
            return jsonResponse(['mesage'=>"quarto excluido com sucesso"]);
        }else{
            return jsonResponse(['mesage'=>"erro ao excluir"]);
        }
    }
    
    public static function atualizar($conn, $id, $data){
        $result = quartoModel:: atualizar($conn, $id, $data);
        if ($result){
            return jsonResponse(['mesage'=>"quarto atualizado com sucesso"]);
        }else{
            return jsonResponse(['mesage'=>"erro ao atualizar"]);
        }
    }
    public static function buscarDisponivel($conn,$data) {
        
          ValidateController::validate_data($data, ["inicio", "fim", "qtd"]);
          $data["inicio"] = ValidateController::fix_dateHour($data["inicio"], 14);
          $data["fim"] = ValidateController::fix_dateHour($data["fim"], 12);
          
          $resultado = quartoModel:: buscarDisponiveis($conn,$data);
                if ($resultado) {
                    foreach ($resultado as &$quarto) {
                $quarto['fotos'] = PhotoModel::buscarQuartoid($conn, $quarto['id']);
            }
                    return jsonResponse(['quartos'=> $resultado]);
                } else {
                    return jsonResponse(['mesage'=>"não tem quartos disponiveis"],400);
                }



    }
}




?>