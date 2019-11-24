<?php
    class Questions {
        //Database connection and target table name
        private $conn;
        private $table_name = 'questions';

        //Question object properties
        public $id;
        public $type;
        public $category;
        public $qText;
        public $questions;
        public $author;
        public $createdAt;
    }