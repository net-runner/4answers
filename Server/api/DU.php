<?php
require_once "../index.php";
//Endpoint for user deletion

//Adding headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');


//Get posted data
if (isset($_GET['username'])) {
    //If delivered as parameters
    $un = $_GET['username'];
} else {
    //If delivered as body
    $data = json_decode(file_get_contents('php://input'), true);
    $un = $data['username'];
}

//Perform query
$sql = 'DELETE FROM users WHERE users."username"=$1';
if (!pg_query_params($conn, $sql, array($un))) {
    echo json_encode("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
}
echo json_encode(array(
    'result' => "Success",
    'message' => "User: " . $un . " has been deleted."
));
