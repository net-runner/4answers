<?php
require_once "../index.php";
//Register endpoint

//Adding headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');



//Get posted data
if (isset($_GET['username']) and isset($_GET['password'])) {
    //If delivered as parameters
    $un = $_GET['username'];
    $pw = $_GET['password'];
} else {
    //If delivered as body
    $data = json_decode(file_get_contents('php://input'), true);
    $un = $data['username'];
    $pw = $data['password'];
}
$result = pg_query_params($conn, "SELECT * FROM users WHERE username=$1", array($un));
$res = pg_fetch_row($result);
if (strlen($un) >= 6 and strlen($pw) >= 6) {
    //If there is not a user with this username
    if (empty($res)) {
        $hashed_password = password_hash($pw, PASSWORD_BCRYPT);
        $dt = date("Y-m-d H:i:s");

        $result = pg_query_params($conn, "INSERT INTO users (username, password, userType, registerAt, correctA, answers, correctPercentage) 
        VALUES ($1,$2,$3,$4,$5,$6,$7)", array($un, $hashed_password, "normal", $dt, 0, 0, 100));

        echo json_encode(array(
            'result' => "Success.",
            'message' => "Account created.",
            'userp' => 100,
            'qType' => 'normal'
        ));
    } else {
        //Handle error
        echo json_encode(array(
            'result' => "Error.",
            'message' => "User already exists."
        ));
    }
} else {
    echo json_encode(array(
        'result' => "Error.",
        'message' => "Password or Username shorter than 6 chars"
    ));
}
