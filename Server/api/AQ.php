<?php
require_once "../index.php";
//GET ALL QUESTIONS ORDERED BY CORRECT PERCENTAGE
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');


$sql =
    'SELECT *
    FROM questions
    ORDER BY questions."correctPercentage" DESC';


$rw = pg_query($conn, $sql) or die('Cannot fetch questions');
$rows = pg_num_rows($rw);
if ($rows > 0) {
    $q_arr = array();
    $q_arr['data'] = array();
    while ($row = pg_fetch_row($rw)) {
        $questions = json_decode($row[1]);
        $q_item = array(
            'id' => $row[0],
            'qText' => $row[3],
            'qp' => $row[9],
            'correctA' => $row[7],
            'answers' => $row[8],
            'correctPercentage' => $row[9],
            'createdAt' => $row[5],
            'questions' => $questions->{'xd'}
        );
        array_push($q_arr['data'], $q_item);
    }
    echo json_encode($q_arr);
} else {
    echo json_encode(array('response' => 'No questions found.'));
}
