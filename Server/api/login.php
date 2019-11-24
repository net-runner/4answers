<?php
//Login endpoint
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

$conn = new mysqli('localhost', 'root', '', '4answers');
if (!$conn) exit('Connection error');

//Get posted data
$data = json_decode(file_get_contents("php://input"));
