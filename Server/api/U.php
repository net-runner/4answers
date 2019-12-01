<?php
//Update stats endpoint

//Adding headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

//Get posted data
if (isset($_GET['username']) and isset($_GET['stats'])) {
    //If delivered as parameters
    $un = $_GET['username'];
    $st = $_GET['stats'];
} else {
    //If delivered as body
    $data = json_decode(file_get_contents('php://input'), true);
    $un = $data['username'];
    $st = $data['stats'];
}
//Handle basic db connection
$conn = new mysqli('localhost', 'root', '', '4answers');
if (!$conn) exit('Connection error');
$testQ = "SELECT * FROM users WHERE username='{$un}'";
$rw = $conn->query($testQ) or die('Cannot fetch user');
$res = $rw->fetch_row();

//If there is a user with this username
if (!empty($res)) {
    $crA = $res[5] + $st["corrects"];
    $fA = $res[6] + $st["failures"];
    $cP = ($crA / $fA) * 100;
    $updateQ = "UPDATE users SET correctA='{$crA}',
    falseA='{$fA}',
    correctPercentage='{$cP}'
    WHERE username='{$un}'";
    $xx = $conn->query($updateQ) or die(json_encode(array(
        'result' => "Error",
        'message' => "Cannot perform user stats update."
    )));
    echo json_encode(array(
        'result' => "Success",
        'message' => "User stats updated.",
        'corrects' => $crA,
        'failures' => $fA,
        'cP' => $cP
    ));
} else {
    //Handle error
    echo json_encode(array(
        'result' => "Error",
        'message' => "User does not exist."
    ));
}
