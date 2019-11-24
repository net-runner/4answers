<?php
    class User {
        private $conn;
        private $table = 'users';

        //User object properties
        public $id;
        public $username;
        public $password;
        public $register_at;
        public $user_type;

        public function __construct($db){
            $this->conn = $db;
        }
    }