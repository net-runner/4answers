<?php
require_once "../index.php";
//Register endpoint

//Adding headers
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
$res = $db->fetchUser($un);
if (strlen($un) >= 6 and strlen($pw) >= 6) {
    //If there is not a user with this username
    if (empty($res)) {
        $hashed_password = password_hash($pw, PASSWORD_BCRYPT);
        $dt = date("Y-m-d H:i:s");
        $ar = array("username" => $un, "password" => $hashed_password, "userType" => "normal", "registerAt" => $dt, "correctA" => 0, "answers" => 0, "correctPercentage" => 100);
        $result = $db->createUser($ar);

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
