<?php
//Get all users
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$conn = new mysqli('localhost', 'root', '', '4answers');
if (!$conn) exit('Connection error');

$sql =
    "SELECT *
    FROM users";


$rw = $conn->query($sql) or die('Cannot fetch users');
$rows = $rw->num_rows;
if ($rows > 0) {
    $q_arr = array();
    $q_arr['data'] = array();
    while ($row = $rw->fetch_row()) {
        $q_item = array(
            'result' => "Success.",
            'message' => "Logged in.",
            'userp' => $res[7],
            'type' => $res[4]
        );
        array_push($q_arr['data'], $q_item);
    }
    echo json_encode($q_arr);
} else {
    echo json_encode(array('response' => 'No users found.'));
}
