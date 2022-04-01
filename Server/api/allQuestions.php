<?php
require_once "../index.php";
//Get all questions
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$st = $app['db']->prepare("SELECT *
FROM questions");

$st->execute() or die('Cannot fetch questions');
$rows = $st->num_rows;
if ($rows > 0) {
    $q_arr = array();
    $q_arr['data'] = array();
    while ($row = $st->fetch_row()) {
        $questions = json_decode($row[1]);
        $q_item = array(
            'id' => $row[0],
            'qType' => $row[2],
            'category' => $row[6],
            'author' => $row[4],
            'questions' => $questions->{'xd'},
            'createdAt' => $row[5],
            'qText' => $row[3]
        );
        array_push($q_arr['data'], $q_item);
    }
    echo json_encode($q_arr);
} else {
    echo json_encode(array('response' => 'No questions found.'));
}
