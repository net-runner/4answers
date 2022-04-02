<?php
//Get all questions
require "../index.php";

$sql =
    "SELECT *
    FROM questions";


$rw = pg_query($conn, $sql) or die('Cannot fetch questions');
$rows = pg_num_rows($rw);
if ($rows > 0) {
    $q_arr = array();
    $q_arr['data'] = array();
    while ($row = pg_fetch_row($rw)) {
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
