<?php
$dbopts = parse_url(getenv('DATABASE_URL'));
$app->register(new Csanquer\Silex\PdoServiceProvider\Provider\PDOServiceProvider('pdo'),
               array(
                'pdo.server' => array(
                   'driver'   => 'pgsql',
                   'user' => $dbopts["user"],
                   'password' => $dbopts["pass"],
                   'host' => $dbopts["host"],
                   'port' => $dbopts["port"],
                   'dbname' => ltrim($dbopts["path"],'/')
                   )
               )
);


$app->get('/api/questions/all', function() use($app) {
    $st = $app['pdo']->prepare("SELECT *
    FROM questions");
    $st->execute();
  
    $questions = array();
    $q_arr = array();
    $q_arr['data'] = array();
    while ($row = $st->fetch(PDO::FETCH_ASSOC)) {
        $questions = json_decode($row[1]);
        $q_item = array(
            'id' => $row[0],
            'qType' => $row[2],
            'category' => $row[6],
            'author' => $row[4],
            'questions' => $questions->{'xd'},
            'createdAt' => $row[5],
            'qText' => $row[3]
        );
        array_push($q_arr['data'], $q_item);
    }
    return json_encode($q_arr);
  });
