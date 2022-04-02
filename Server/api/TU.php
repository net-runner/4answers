<?php
require_once "../index.php";
//GET TOP 10 USERS BY CORRECT PERCENTAGE
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');


$sql =
    'SELECT *
    FROM public.users WHERE users."userType" = \'normal\'
    ORDER BY users."correctPercentage" DESC
    LIMIT 10';



$rw = pg_query($conn, $sql) or die('Cannot fetch users');
$rows = pg_num_rows($rw);
if ($rows > 0) {
    $q_arr = array();
    $q_arr['data'] = array();
    while ($row = pg_fetch_row($rw)) {
        $q_item = array(
            'username' => $row[1],
            'userp' => $row[7],
            'registerAt' => $row[3]
        );
        array_push($q_arr['data'], $q_item);
    }
    echo json_encode($q_arr);
} else {
    echo json_encode(array('response' => 'No users found.'));
}
