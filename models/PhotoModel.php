<?php

class PhotoModel {

    public static function listarTodos($conn) {
        $sql = "SELECT * FROM quartos";
        $result = $conn->query($sql);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public static function buscarQuartoid($conn, $id){
        $sql = "SELECT f.nome FROM imagens_quartos qf ON qf.imagem_id = f.id
        WHERE qf.quarto_id = ?";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result();
        $photos = [];
        while ($row = $result->fetch_assoc()) {
            $photos[] = $row['nome'];
        }
        return $photos;
    }

    public static function create($conn, $name) {
        $sql = "INSERT INTO imagens (nome) VALUES (?);";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $name);
        if (stmt->execute()){
            return $conn->insert_id;
        }
        return false;
        
    }

    public static function createRelationRoom($conn, $id_room, $id_photo) {
        $sql = "INSERT INTO imagens_quartos (quarto_id, imagem_id) VALUES (?, ?);";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $idRoom, $idPhoto);
        if (stmt->execute()){
            return $conn->insert_id;
        }
        return false;
        
    }   

    public static function update($conn, $id, $data) {
        $sql = "UPDATE imagens SET nome = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", 
            $data["nome"],
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
        $result = $stmt->get_result();

        $row = $result && $result ->num_rows >0;
        $stmt->close();
        return $row;
    }
}

?>