<?php
//Endpoint for question deletion

//Adding headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

//Database connection
$conn = new mysqli('localhost', 'root', '', '4answers');
if (!$conn) exit('Connection error');

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
$conn = new mysqli('localhost', 'root', '', '4answers');
if (!$conn) exit('Connection error');
if (!($stmt = $conn->prepare("DELETE FROM questions WHERE qText=(?)"))) {
        echo json_encode("Prepare failed:  (" . $stmt->errno . ") " . $stmt->error);
}
if (!$stmt->bind_param("s", $qt)) {
   echo json_encode("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
}
if (!$stmt->execute()) {
    echo json_encode("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
}else{
    echo json_encode(array(
        'result' => "Success",
        'message' => "Question: " . $qt . " has been deleted."
    ));
}
