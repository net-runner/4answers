<?php
//Get all history data
require "../index.php";
header('Access-Control-Allow-Methods: POST');



//Get posted data
if (isset($_POST['username'])) {
    //If delivered as parameters
    $un = $_POST['username'];
} else {
    //If delivered as body
    $data = json_decode(file_get_contents('php://input'), true);
    $un = $data['username'];
}

$res = $db->fetchUser($un);
//If there is a user with this username
if (!empty($res)) {
    $id = $res[0];
    $sql = 'SELECT * FROM history WHERE history."userId" = $1 ORDER BY history."createdAt" DESC';
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
