<?php
class authRoutes {
    public static function validateData($data) {
        if (!isset($data['nome','email','telefone','cpf','senha','cargo'])) {
            return jsonResonse(['message'=>'Erro, falta preencher o campo: disponivel'],400);
        }
    }
}
?>