<?php
//Register endpoint

//Adding headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');



//Get posted data
$un = $_GET['username'];
$pw = $_GET['password'];
$conn = new mysqli('localhost', 'root', '', '4answers');
if (!$conn) exit('Connection error');
$testQ = "SELECT * FROM users WHERE username='{$un}'";
$rw = $conn->query($testQ) or die('Cannot fetch user');
$res = $rw->fetch_row();

//If there is a user with this username
if (!empty($res)) {
    if (password_verify($pw, $res[2])) {
        echo json_encode(array(
            'result' => "Success",
            'message' => "Logged in."
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
