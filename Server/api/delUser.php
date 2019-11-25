<?php
//Endpoint for user deletion

//Adding headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

//Database connection
$conn = new mysqli('localhost', 'root', '', '4answers');
if (!$conn) exit('Connection error');

//Get posted data
$un = $_GET['username'];

$delQuery = "DELETE FROM users WHERE username='{$un}'";

//Perform query
if ($conn->query($delQuery) === TRUE) {
    echo json_encode(array(
        'result' => "Success",
        'message' => "User: " . $un . " has been deleted."
    ));
} else {
    echo json_encode(array(
        'result' => "Error",
        'message' => $conn->error
    ));
}
