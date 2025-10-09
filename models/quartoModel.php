<?php

class quartoModel {

    public static function listarTodos($conn) {
        $sql = "SELECT * FROM quartos";
        $result = $conn->query($sql);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public static function buscarPorid($conn, $id){
        $sql = "SELECT * FROM quartos WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
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
        $sql = "UPDATE quartos SET nome = ?, numero = ?, qnt_cama_casal = ?, qnt_cama_solteiro = ?, preco = ?, disponivel = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("siiidii", 
            $data["nome"],
            $data["numero"],
            $data["qtd_casal"],
            $data["qtd_solteiro"],
            $data["preco"],
            $data["disponivel"],
            $id
        );
        return $stmt->execute();
    }

    public static function deletar($conn,$id) {
        $sql = "DELETE FROM quartos WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }

    public static function buscarDisponiveis($conn,$data) {
        $sql = "SELECT
        q.id,
        q.nome,
        q.qnt_cama_casal,
        q.qnt_cama_solteiro,
        q.preco,
        q.disponivel
        FROM quartos q
        WHERE q.id NOT IN (
        SELECT
        r.quarto_id
        FROM
        reservas r
        WHERE
        (r.fim >= ? AND r.inicio <= ?)
        )
        AND q.disponivel = true
        AND ((q.qnt_cama_casal * 2) + q.qnt_cama_solteiro) >= ?;";

        $stmt = $conn->prepare($sql);

        $stmt->bind_param("ssi", 

        $data['inicio'],
        $data['fim'],
        $data['qtd' ?? 1] 

        );

        $stmt->execute();
        $result = $stmt->get_result();
        $quartos = [];
         while ($row = $result->fetch_assoc()) {
        $quartos[] = $row;
    }

    return $quartos;
        // return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public static function blockById($conn,$id) {
        $sql = "SELECT id FROM quartos WHERE id = ? FOR UPDATE;";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = stmt->get_result();

        $row = $result && $result ->num_rows >0;
        $stmt->close();
        return $row;
    }
}

?>