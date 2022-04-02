<?php
require_once "../index.php";
//GET TOP 10 QUESTIONS BY CORRECT PERCENTAGE
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');


$sql =
    'SELECT *
    FROM public.questions
    ORDER BY questions."correctPercentage" DESC
    LIMIT 10';


$rw = pg_query($conn, $sql) or die('Cannot fetch questions');
$rows = pg_num_rows($rw);
if ($rows > 0) {
    $q_arr = array();
    $q_arr['data'] = array();
    while ($row =  pg_fetch_row($rw)) {
        $questions = json_decode($row[1]);
        $q_item = array(
            'qText' => $row[3],
            'qp' => $row[9],
            'createdAt' => $row[5],
            'questions' => $questions->{'xd'}
        );
        array_push($q_arr['data'], $q_item);
    }
    echo json_encode($q_arr);
} else {
    echo json_encode(array('response' => 'No questions found.'));
}
