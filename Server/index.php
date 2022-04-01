<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
$dbopts = parse_url(getenv('DATABASE_URL'));

$db_handle = pg_connect("host=" .  $dbopts["host"] . "dbname=" . ltrim($dbopts["path"], '/') . "user=" . $dbopts["user"] . "password=" . $dbopts["pass"] . "port=" . $dbopts["port"]);

if ($db_handle) {

    echo 'Connection attempt succeeded.';
} else {

    echo 'Connection attempt failed.';
}
