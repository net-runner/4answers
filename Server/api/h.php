<?php
//Get all history data
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

$conn = new mysqli('localhost', 'root', '', '4answers');
if (!$conn) exit('Connection error');


//Get posted data
if (isset($_GET['username'])) {
    //If delivered as parameters
    $un = $_GET['username'];
} else {
    //If delivered as body
    $data = json_decode(file_get_contents('php://input'), true);
    $un = $data['username'];
}

if (!($stmt = $conn->prepare("SELECT * FROM users WHERE username=(?)"))) {
        echo json_encode("Prepare failed:  (" . $stmt->errno . ") " . $stmt->error);
}
if (!$stmt->bind_param("s", $un)) {
   echo json_encode("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
}
if (!$stmt->execute()) {
    echo json_encode("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
}
$res = $stmt->get_result()->fetch_row();
//If there is a user with this username
if (!empty($res)) {
    $id = $res[0];
    $sql = "SELECT * FROM history WHERE userId = {$id} ORDER BY createdAt DESC";
    $rw = $conn->query($sql) or die('Cannot fetch history');
    $rows = $rw->num_rows;
    if ($rows > 0) {
    $q_arr = array();
    $q_arr['data'] = array();
    while ($row = $rw->fetch_row()) {
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
