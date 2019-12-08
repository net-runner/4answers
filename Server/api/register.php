<?php
//Register endpoint

//Adding headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');



//Get posted data
if (isset($_GET['username']) and isset($_GET['password'])) {
    //If delivered as parameters
    $un = $_GET['username'];
    $pw = $_GET['password'];
} else {
    //If delivered as body
    $data = json_decode(file_get_contents('php://input'), true);
    $un = $data['username'];
    $pw = $data['password'];
}
$conn = new mysqli('localhost', 'root', '', '4answers');
if (!$conn) exit('Connection error');
$testQ = "SELECT * FROM users WHERE username='{$un}'";
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
if (strlen($un) > 6 and strlen($pw) > 6) {
    //If there is not a user with this username
    if (empty($res)) {
        $hashed_password = password_hash($pw, PASSWORD_BCRYPT);
        $dt = date("Y-m-d H:i:s");

        if (!($stmt = $conn->prepare("INSERT INTO users (username, password, userType, registerAt, correctA, falseA, correctPercentage) 
VALUES (?,?,?,?,?,?,?)"))) {
            echo json_encode("Prepare failed:  (" . $stmt->errno . ") " . $stmt->error);
        }
        $a = 0;
        $b = 0;
        $c = 100;
        $userType = "normal";
        if (!$stmt->bind_param("ssssiii", $un, $hashed_password, $userType, $dt, $a, $b, $c)) {
            echo json_encode("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
        }
        if (!$stmt->execute()) {
            echo json_encode("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
        }
        echo json_encode(array(
            'result' => "Success.",
            'message' => "Account created.",
            'userp' => 100,
            'type' => 'normal'
        ));
    } else {
        //Handle error
        echo json_encode(array(
            'result' => "Error.",
            'message' => "User already exists."
        ));
    }
} else {
    echo json_encode(array(
        'result' => "Error.",
        'message' => "Password or Username shorter than 6 chars"
    ));
}
