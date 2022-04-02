<?php
require "../index.php";
//Update history endpoint
//Adding headers
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');



//Get posted data
if (isset($_POST['username']) and isset($_POST['password'])) {
    //If delivered as parameters
    $un = $_POST['username'];
    $pw = $_POST['questions'];
} else {
    //If delivered as body
    $data = json_decode(file_get_contents('php://input'), true);
    $un = $data['username'];
    $pw = $data['questions'];
}
$res = $db->fetchUser($un);

if (!empty($res)) {
    $dt = date("Y-m-d H:i:s");
    $qt = json_encode($pw);
    $data = array("userId" => $res[0], "questions" => $qt, "createdAt" => $dt);
    if (!(pg_insert($conn, "history", $data))) {
        echo json_encode("Prepare failed:  (" . $stmt->errno . ") " . $stmt->error);
    }
} else {
    //Handle error
    echo json_encode(array(
        'result' => "Error.",
        'message' => "User does not exists."
    ));
}
