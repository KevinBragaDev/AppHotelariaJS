<?php

class quartoModel {

    public static function listarTodos($conn) {
        //$sql = "SELECT * FROM quartos";
        //$result = $conn->query($Mysql);
        //return $result->fetch_all(MYSQLI_ASSOC);
    }

    public static function buscarPorid($conn, $id){
        //$sql = "SELECT * FROM quartos WHERE id = ?";
        //$stmt = $conn->prepare($sql);
        //$stmt->bind_param("i", $id);
        //$stmt->execute();
        //return $stmt->get_result()->fetch_assoc();
    }

    public static function criar($conn, $data) {
        $sql = "INSERT INTO quartos (nome,numero,qnt_cama_casal,qnt_cama_solteiro,preco,disponivel)
                VALUES (?, ?, ?, ?, ?, ?);";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("siiidi", 
            $data["nome"],
            $data["numero"],
            $data["qtd_casal"],
            $data["qtd_solteiro"],
            $data["preco"],
            $data["disponivel"]
        );
        return $stmt->execute();
        
    }   

    public static function atualizar($conn, $id, $data) {
        //$sql = "UPDATE quartos SET nome = ?, numero = ?, qnt_cama_casal = ?, qnt_cama_solt = ?, preco = ?, disponivel = ? WHERE id = ?";
        //    $stmt = $conn->prepare($sql);
        //    $stmt->bind_param("siiidii", 
        //        $data["name"],
        //        $data["number"],
        //        $data["qtd_cama_casal"],
        //        $data["qtd_cama_solteiro"],
        //        $data["preco"],
        //        $data["disponivel"]
        //    )
        //    return $stmt->execute();
    }

    public static function deletar($conn,$id) {
        //$sql = "DELETE FROM quartos WHERE id = ?";
        //$stmt = $conn->prepare($sql);
        //$stmt->bind_param("i", $id);
        //return $stmt->get_result();
    }

    public static function buscarDisponivel($conn,$id) {

    }

}

?>