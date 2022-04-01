<?php
//Update user endpoint

//Adding headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
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

$sql = "SELECT * FROM users WHERE username=$1";
$result = pg_query_params($conn, $sql, array($un));
$res = pg_fetch_row($result);

//If there is a user with this username
if (!empty($res)) {
    $crA = $res[5];
    $fA = $res[6];
    if ($se == "answers") {
        $cP = ($crA / $va) * 100;
    } else if ($se == "correctA") {
        $cP = ($va / $fA) * 100;
    } else {
        $cP = $res[7];
    }
    $sql2 = "UPDATE users SET
    $1=$2, correctPercentage=$3
    WHERE username=$4";
    if (!($stmt = $conn->prepare())) {
        echo json_encode("Prepare failed:  (" . $stmt->errno . ") " . $stmt->error);
    }
    if (!(pg_query_params($conn, $sql2, array($se, $va, $cP, $un)))) {
        echo json_encode("Prepare failed:  (" . $stmt->errno . ") " . $stmt->error);
    }
    echo json_encode(array(
        'result' => "Success",
        'message' => "User edited.",
    ));
} else {
    //Handle error
    echo json_encode(array(
        'result' => "Error",
        'message' => "User does not exist."
    ));
}
