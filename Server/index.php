<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require __DIR__ . '/vendor/autoload.php';
$dbopts;
try {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    $dbopts = parse_url($_SERVER['DATABASE_URL']);
} catch (Exception $ex) {
    $dbopts = parse_url(getenv('DATABASE_URL'));
}





class Database
{
    public function connect($dbopts)
    {
        $this->conn = pg_connect("host=" .  $dbopts["host"] . " dbname=" . ltrim($dbopts["path"], '/') . " user=" . $dbopts["user"] . " password=" . $dbopts["pass"] . " port=" . $dbopts["port"]);
    }
    public function __destruct()
    {
        pg_close($this->conn);
    }
    public function selectUser($un)
    {
        return pg_query_params($this->conn, 'SELECT * FROM public.users WHERE users."username"=$1', array($un));
    }
    public function fetchUser($un)
    {
        return pg_fetch_row($this->selectUser($un));
    }
    public function createUser(array $un)
    {
        return pg_insert($this->conn, "users", $un);
    }
}
$db = new Database;
$db->connect($dbopts);
$conn = $db->conn;
if (!$conn) {
    echo json_encode(array(
        'result' => "Error",
        'message' => "Database connection error."
    ));
}
