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
//If there is a user with this username
if (!empty($res)) {
    if (password_verify($pw, $res[2])) {
        echo json_encode(array(
            'result' => "Success.",
            'message' => "Logged in.",
            'userp' => $res[7],
            'type' => $res[4]
        ));
    } else {
        echo json_encode(array(
            'result' => "Error",
            'message' => "Passwords does not match."
        ));
    }
} else {
    //Handle error
    echo json_encode(array(
        'result' => "Error",
        'message' => "User does not exist."
    ));
}
