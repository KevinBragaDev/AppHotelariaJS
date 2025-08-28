<?php

class PasswordController {
    public static function generateHash($password) {
        return password_Hash($password, PASSWORD_BCRYPT);
    }

    public static function validateHash($password, $hash) {
        return password_verify($password, $hash);
    }
}

?>