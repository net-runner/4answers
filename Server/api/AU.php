<?php
//GET ALL USERS ORDERED BY CORRECT PERCENTAGE
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');


$sql =
    "SELECT *
    FROM users ORDER BY correctPercentage DESC";


$rw = pg_query($conn, $sql) or die('Cannot fetch questions');
$rows = pg_num_rows($rw);
if ($rows > 0) {
    $q_arr = array();
    $q_arr['data'] = array();
    while ($row = pg_fetch_row($rw)) {
        $q_item = array(
            'username' => $row[1],
            'id' => $row[0],
            'userType' => $row[4],
            'userp' => $row[7],
            'correctA' => $row[5],
            'answers' => $row[6],
            'correctPercentage' => $row[7],
            'registerAt' => $row[3],
        );
        array_push($q_arr['data'], $q_item);
    }
    echo json_encode($q_arr);
} else {
    echo json_encode(array('response' => 'No users found.'));
}
