<?php
require_once "../index.php";
//Update stats endpoint

//Adding headers
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

//Get posted data
if (isset($_POST['username']) and isset($_POST['stats'])) {
    //If delivered as parameters
    $un = $_POST['username'];
    $st = $_POST['stats'];
    $an = $data['answers'];
} else {
    //If delivered as body
    $data = json_decode(file_get_contents('php://input'), true);
    $un = $data['username'];
    $st = $data['stats'];
    $an = $data['answers'];
}
//Handle basic db connection

$res = $db->fetchUser($un);
//If there is a user with this username
if (!empty($res)) {
    $crA = $res[5] + $st["corrects"];
    $fA = $res[6] + $st["answers"];
    $cP = ($crA / $fA) * 100;
    $ar = array("correctA" => $crA, "answers" => $fA, "correctPercentage" => $cP);
    $conds = array("username" => $un);

    if (!(pg_update($conn, "users", $ar, $conds))) {
        echo json_encode("Prepare failed:  (" . $stmt->errno . ") " . $stmt->error);
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
        $co = array("id" => $id);
        $resoult = pg_select($conn, "questions", $co);
        $rwss = pg_fetch_row($resoult);
        $fAQ = $rwss[8] + 1;
        $crAQ = $rwss[7];
        if (isset($ok["correct"])) {
            if ($ok["correct"]) {
                $crAQ = $rwss[7] + 1;
            }
        }
        $cPQ = ($crAQ / $fAQ) * 100;
        $ar2 = array("correctA" => $crAQ, "answers" => $fAQ, "correctpPercentage" => $cPQ);
        $conds2 = array("id" => $id);
        if (!(pg_update($conn, "questions", $ar2, $conds))) {
            echo json_encode("Prepare failed:  (" . $stmt->errno . ") " . $stmt->error);
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
