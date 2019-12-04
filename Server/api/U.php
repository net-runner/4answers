<?php
//Update stats endpoint

//Adding headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

//Get posted data
if (isset($_GET['username']) and isset($_GET['stats'])) {
    //If delivered as parameters
    $un = $_GET['username'];
    $st = $_GET['stats'];
    $an = $data['answers'];
} else {
    //If delivered as body
    $data = json_decode(file_get_contents('php://input'), true);
    $un = $data['username'];
    $st = $data['stats'];
    $an = $data['answers'];
}
//Handle basic db connection
$conn = new mysqli('localhost', 'root', '', '4answers');
if (!$conn) exit('Connection error');
$testQ = "SELECT * FROM users WHERE username='{$un}'";
$rw = $conn->query($testQ) or die('Cannot fetch user');
$res = $rw->fetch_row();

//If there is a user with this username
if (!empty($res)) {
    $crA = $res[5] + $st["corrects"];
    $fA = $res[6] + $st["failures"];
    $cP = ($crA / $fA) * 100;
    if (!($stmt = $conn->prepare("UPDATE users SET
    correctA= (?),
    falseA=(?),
    correctPercentage=(?)
    WHERE username=(?)"))) {
        echo json_encode("Prepare failed:  (" . $stmt->errno . ") " . $stmt->error);
    }
    if (!$stmt->bind_param("iids", $crA, $fA, $cP, $un)) {
        echo json_encode("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
    }
    if (!$stmt->execute()) {
        echo json_encode("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
    }
    echo json_encode(array(
        'result' => "Success",
        'message' => "User stats updated.",
        'corrects' => $crA,
        'failures' => $fA,
        'cP' => $cP
    ));
    //Update stats for questions
    $i = 0;
    while ($i < count($an)) {
        $ok  = $an[$i];
        $id = $ok["id"];
        $qQ = "SELECT * FROM questions WHERE id='{$id}'";
        $rws = $conn->query($qQ) or die('Cannot fetch question');
        $rwss = $rws->fetch_row();
        if (isset($ok["correct"])) {
            if ($ok["correct"]) {
                $crAQ = $rwss[7] + 1;
                $fAQ = $rwss[8];
            } else {
                $crAQ = $rwss[7];
                $fAQ = $rwss[8] + 1;
            }
        } else {
            $crAQ = $rwss[7];
            $fAQ = $rwss[8] + 1;
        }
        $cPQ = ($crAQ / $fAQ) * 100;
        if (!($stmt = $conn->prepare("UPDATE questions SET
        correctA= (?),
        falseA=(?),
        correctPercentage=(?)
        WHERE id=(?)"))) {
            echo json_encode("Prepare failed:  (" . $stmt->errno . ") " . $stmt->error);
        }
        if (!$stmt->bind_param("iidi", $crAQ, $fAQ, $cPQ, $id)) {
            echo json_encode("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
        }
        if (!$stmt->execute()) {
            echo json_encode("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
        }
        $i++;
    }
} else {
    //Handle error
    echo json_encode(array(
        'result' => "Error",
        'message' => "User does not exist."
    ));
}
