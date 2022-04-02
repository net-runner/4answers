<?php
require_once "../index.php";
//Endpoint for question deletion

//Adding headers
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

//Database connection

//Get posted data
if (isset($_GET['question'])) {
    //If delivered as parameters
    $qt = $_GET['question'];
} else {
    //If delivered as body
    $data = json_decode(file_get_contents('php://input'), true);
    $qt = $data['question'];
}

//Perform query
$sql = 'DELETE FROM questions WHERE questions."qText"=$1';

if (!pg_query_params($conn, $sql, array($qt))) {
    echo json_encode("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
}
echo json_encode(array(
    'result' => "Success",
    'message' => "Question: " . $qt . " has been deleted."
));
