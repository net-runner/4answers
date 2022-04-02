<?php
require "../index.php";
//Update question endpoint

//Adding headers
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

//Get posted data
if (isset($_GET['username']) and isset($_GET['section']) and isset($_GET['value'])) {
    //If delivered as parameters
    $un = $_GET['username'];
    $se = $_GET['section'];
    $va = $data['value'];
} else {
    //If delivered as body
    $data = json_decode(file_get_contents('php://input'), true);
    $un = $data['username'];
    $se = $data['section'];
    $va = $data['value'];
}
//Handle basic db connection

$sql = 'SELECT * FROM questions WHERE questions."id"=$1';
$result = pg_query_params($conn, $sql, array($un));
$res = pg_fetch_row($result);
//If there is a user with this username
if (!empty($res)) {
    $crA = $res[7];
    $fA = $res[8];
    if ($se == "answers") {
        $cP = ($crA / $va) * 100;
    } else if ($se == "correctA") {
        $cP = ($va / $fA) * 100;
    } else {
        $cP = $res[9];
    }
    if ($se == "questions") {
        $elonba["xd"] = $va;
        $va = json_encode($elonba);
    }
    $sql2 = "UPDATE questions SET
    $1=$2, correctPercentage=$3
    WHERE id=$4";
    if (!(pg_query_params($conn, $sql2, array($se, $va, $cP, $un)))) {
        echo json_encode("Prepare failed:  (" . $stmt->errno . ") " . $stmt->error);
    }
    echo json_encode(array(
        'result' => "Success",
        'message' => "Question edited.",
    ));
} else {
    //Handle error
    echo json_encode(array(
        'result' => "Error",
        'message' => "Question does not exist."
    ));
}
