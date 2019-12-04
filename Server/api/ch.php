<?php
//Update history endpoint
//Adding headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');



//Get posted data
if (isset($_GET['username']) and isset($_GET['password'])) {
    //If delivered as parameters
    $un = $_GET['username'];
    $pw = $_GET['questions'];
} else {
    //If delivered as body
    $data = json_decode(file_get_contents('php://input'), true);
    $un = $data['username'];
    $pw = $data['questions'];
}
$conn = new mysqli('localhost', 'root', '', '4answers');
if (!$conn) exit('Connection error');
$testQ = "SELECT * FROM users WHERE username='{$un}'";
$rw = $conn->query($testQ) or die('Cannot fetch user');
$res = $rw->fetch_row();

if (!empty($res)) {
    $dt = date("Y-m-d H:i:s");
    $qt = json_encode($pw);
    if (!($stmt = $conn->prepare("INSERT INTO history (userId, questions, createdAt)  VALUES (?,?,?)"))) {
        echo json_encode("Prepare failed:  (" . $stmt->errno . ") " . $stmt->error);
    }
    if (!$stmt->bind_param("iss", $res[0], $qt, $dt)) {
        echo json_encode("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
    }
    if (!$stmt->execute()) {
        echo json_encode("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
    }
} else {
    //Handle error
    echo json_encode(array(
        'result' => "Error.",
        'message' => "User does not exists."
    ));
}