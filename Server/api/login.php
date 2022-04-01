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
$dbopts = parse_url(getenv('DATABASE_URL'));
$conn = pg_connect("host=" . $dbopts["host"] . " dbname=" . ltrim($dbopts["path"], '/') . " user=" . $dbopts["user"] . " password=" . $dbopts["pas"] . " port=" . $dbopts["port"]);
if (!$conn) exit('Connection error');
$result = pg_query_params($conn, "SELECT * FROM users WHERE username=$1", $un);

$res = pg_fetch_row($result);
//If there is a user with this username
if (!empty($result)) {
    if (password_verify($pw, $res[2])) {
        echo json_encode(array(
            'result' => "Success.",
            'message' => "Logged in.",
            'userp' => $res[7],
            'type' => $res[4]
        ));
    } else {
        echo json_encode(array(
            'result' => "Error",
            'message' => "Passwords does not match."
        ));
    }
} else {
    //Handle error
    echo json_encode(array(
        'result' => "Error",
        'message' => "User does not exist."
    ));
}
