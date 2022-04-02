<?php
require_once "../index.php";
//CREATE QUESTION ENDPOINT
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');




//Get posted data
if (isset($_GET['question'])) {
    //If delivered as parameters
    $qt = $_GET['question'];
} else {
    //If delivered as body
    $data = json_decode(file_get_contents('php://input'), true);
    $qt = $data['question'];
}
$sql = "SELECT * FROM questions WHERE qText=$1";

$rw = pg_query_params($conn, $sql, array($qt["qText"])) or die('Cannot fetch questions');
$rows = pg_num_rows($rw);
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

    $sql2 = "INSERT INTO questions (questions, qType, qText, author, createdAt, category, correctA, answers, correctPercentage)  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)";
    if (!(pg_query_params($conn, $sql2, array($que, $tp, $qTex, $au, $dt, $ct, $ca, $a, $cP)))) {
        echo json_encode("Prepare failed:  (" . $stmt->errno . ") " . $stmt->error);
    }
    echo json_encode(array('response' => 'Added question.'));
} else {
    echo json_encode(array('response' => 'Question with that text exist'));
}
