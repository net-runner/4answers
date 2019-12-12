<?php
//GET ALL QUESTIONS ORDERED BY CORRECT PERCENTAGE
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

$conn = new mysqli('localhost', 'root', '', '4answers');
if (!$conn) exit('Connection error');

$sql =
    "SELECT *
    FROM questions
    ORDER BY correctPercentage DESC";


$rw = $conn->query($sql) or die('Cannot fetch questions');
$rows = $rw->num_rows;
if ($rows > 0) {
    $q_arr = array();
    $q_arr['data'] = array();
    while ($row = $rw->fetch_row()) {
        $questions = json_decode($row[1]);
        $q_item = array(
            'id'=>$row[0],
            'qText' => $row[3],
            'qp' => $row[9],
            'correctA'=> $row[7],
            'answers'=> $row[8],
            'correctPercentage'=>$row[9],
            'createdAt' => $row[5],
            'questions' => $questions->{'xd'}
        );
        array_push($q_arr['data'], $q_item);
    }
    echo json_encode($q_arr);
} else {
    echo json_encode(array('response' => 'No questions found.'));
}
