<?php
//CREATE QUESTION ENDPOINT
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

$conn = new mysqli('localhost', 'root', '', '4answers');
if (!$conn) exit('Connection error');


//Get posted data
if (isset($_GET['question'])) {
    //If delivered as parameters
    $qt= $_GET['question'];
} else {
    //If delivered as body
    $data = json_decode(file_get_contents('php://input'), true);
    $qt = $data['question'];
}

if (!($stmt = $conn->prepare("SELECT * FROM questions WHERE qText=(?)"))) {
    echo json_encode("Prepare failed:  (" . $stmt->errno . ") " . $stmt->error);
}
if (!$stmt->bind_param("s", $qt["qText"])) {
echo json_encode("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
}
if (!$stmt->execute()) {
echo json_encode("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
}
$res = $stmt->get_result()->fetch_row();
//If there is no question with that question text
if (empty($res)) {
    //Variables for bind definition
    $elonba["xd"] = $qt["questions"];
    $que = json_encode($elonba);
    $tp = "4a";
    $qTex = $qt["qText"];
    $au = 1;
    $dt = date("Y-m-d H:i:s");
    $ct = "e14";
    $ca = 0;
    $a = 0;
    $cP = 100;


    if (!($stmt = $conn->prepare("INSERT INTO questions (questions, qType, qText, author, createdAt, category, correctA, answers, correctPercentage)  VALUES (?,?,?,?,?,?,?,?,?)"))) {
        echo json_encode("Prepare failed:  (" . $stmt->errno . ") " . $stmt->error);
    }
    if (!$stmt->bind_param("sssissiii", $que, $tp, $qTex, $au, $dt, $ct, $ca, $a, $cP)) {
        echo json_encode("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
    }
    if (!$stmt->execute()) {
        echo json_encode("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
    }else{
        echo json_encode(array('response' => 'Added question.'));
    }
}else{
    echo json_encode(array('response' => 'Question with that text exist'));
}