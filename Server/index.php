<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();


$dbopts = parse_url($_SERVER['DATABASE_URL']);
$conn = pg_connect("host=" .  $dbopts["host"] . " dbname=" . ltrim($dbopts["path"], '/') . " user=" . $dbopts["user"] . " password=" . $dbopts["pass"] . " port=" . $dbopts["port"]);

if ($conn) {
} else {
    $conn = pg_connect("host=localhost dbname=4answers user=postgres password=zaq1@WSX");
    if ($conn) {
    } else {
        echo json_decode('Database connection failed.');
    }
}
