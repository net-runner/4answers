<?php
//Update question endpoint

//Adding headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

//Get posted data
if (isset($_GET['username']) and isset($_GET['section']) and isset($_GET['value'])) {
    //If delivered as parameters
    $un = $_GET['username'];
    $se = $_GET['section'];
    $va = $data['value'];
} else {
    //If delivered as body
    $data = json_decode(file_get_contents('php://input'), true);
    $un = $data['username'];
    $se = $data['section'];
    $va = $data['value'];
}
//Handle basic db connection
$conn = new mysqli('localhost', 'root', '', '4answers');
if (!$conn) exit('Connection error');
$testQ = "SELECT * FROM questions WHERE id='{$un}'";
$rw = $conn->query($testQ) or die('Cannot fetch user');
$res = $rw->fetch_row();

//If there is a user with this username
if (!empty($res)) {
    $crA = $res[7];
    $fA = $res[8];
    if($se == "answers"){
        $cP = ($crA / $va) * 100;
    }else if($se == "correctA"){
        $cP = ($va / $fA) * 100;
    }else{
        $cP = $res[9];
    }
    if($se == "questions"){
        $elonba["xd"] = $va;
        $va = json_encode($elonba);
    }
    if (!($stmt = $conn->prepare("UPDATE questions SET
    {$se}=(?), correctPercentage=(?)
    WHERE id=(?)"))) {
        echo json_encode("Prepare failed:  (" . $stmt->errno . ") " . $stmt->error);
    }
    if (!$stmt->bind_param("sis", $va,$cP, $un)) {
        echo json_encode("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
    }
    if (!$stmt->execute()) {
        echo json_encode("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
    }
    echo json_encode(array(
        'result' => "Success",
        'message' => "Question edited.",
    ));
    
} else {
    //Handle error
    echo json_encode(array(
        'result' => "Error",
        'message' => "Question does not exist."
    ));
}
