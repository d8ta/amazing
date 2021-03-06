<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes">
    <link href='http://fonts.googleapis.com/css?family=Ceviche+One|Exo+2:400,200,600' rel='stylesheet' type='text/css'>
    <script type="text/javascript" src="js/release.min.js"></script>
    <link href='http://fonts.googleapis.com/css?family=Ceviche+One|Exo+2:400,200,600' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Audiowide' rel='stylesheet' type='text/css'>
    <link type="text/css" rel="stylesheet" href="main.css">
    <title>Highscore</title>
</head>
<body>

<div>

    <?php
    $pagetitle = "Highscore";

    include "functions.php";

    // gets the highscore from JS
    $player = $_POST['player'];
    $highscore = $_POST['score'];

    // $sql = $dbh->query("INSERT INTO Score (playername, highscore) VALUES ('$player', '$highscore')");
    $sql = $dbh->prepare("INSERT INTO Score (playername, highscore) VALUES (?, ?)");
    $sql->execute(array($_POST['player'], $_POST['score']));

    $sth = $dbh->query("SELECT * FROM Score ORDER BY highscore DESC LIMIT 0, 10");
    $results = $sth->fetchAll();

    echo "<table>
<tr>
<th><h3>Playername</h3></th>
<th><h3>Score</h3></th>
</tr>

";
    ?>


    <h1>HIGHSCORE</h1>



    <?php

    foreach ($results as $result) {
        echo "<tr>";
        echo "<td>$result->playername</td>";
        echo "<td>$result->highscore</td>";
        echo "</tr>";
    }
    ?>

    <p><a href="html/game.html">
            <button type="button" class="grow">Play again</button>
        </a></p>
            <audio loop autoplay>
                <source src="sound/marchtowar.wav" type="audio/mpeg">
            </audio>

</div>


</body>
</html>