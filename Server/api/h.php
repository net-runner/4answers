<?php
//Get all history data
require_once "../index.php";
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');



//Get posted data
if (isset($_GET['username'])) {
    //If delivered as parameters
    $un = $_GET['username'];
} else {
    //If delivered as body
    $data = json_decode(file_get_contents('php://input'), true);
    $un = $data['username'];
}

$result = pg_query_params($conn, "SELECT * FROM users WHERE username=$1", array($un));
$res = pg_fetch_row($result);
//If there is a user with this username
if (!empty($res)) {
    $id = $res[0];
    $sql = "SELECT * FROM history WHERE userId = $1 ORDER BY createdAt DESC";
    $rw = pg_query_params($conn, $sql, array($id));
    $rows = pg_num_rows($rw);
    if ($rows > 0) {
        $q_arr = array();
        $q_arr['data'] = array();
        while ($row = pg_fetch_row($rw)) {
            $questions = json_decode($row[3]);
            $q_item = array(
                'questions' => $questions->{'data'},
                'createdAt' => $row[2],
            );
            array_push($q_arr['data'], $q_item);
        }
        echo json_encode($q_arr);
    } else {
        echo json_encode(array('response' => 'No history found.'));
    }
} else {
    //Handle error
    echo json_encode(array(
        'result' => "Error",
        'message' => "User does not exist."
    ));
}
