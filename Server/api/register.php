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

//If there is not a user with this username
if (empty($res)) {
    $hashed_password = password_hash($pw, PASSWORD_BCRYPT);
    $dt = date("Y-m-d H:i:s");

    $creation_query = "INSERT INTO users (username, password, userType, registerAt)
    VALUES ('{$un}','{$hashed_password}','normal','{$dt}')";

    $rw2 = $conn->query($creation_query) or die('Cannot add user');
    echo json_encode(array(
        'result' => "Success.",
        'message' => "Account created."
    ));
} else {
    //Handle error
    echo json_encode(array(
        'result' => "Error.",
        'message' => "User already exists."
    ));
}
