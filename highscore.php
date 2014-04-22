<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="main.js"></script>
    <title>Highscore</title>
</head>
<body>


<?php
$pagetitle = "Highscore";


//ToDo: von mysqli -> PDO wg. prepared statements

$connect = mysqli_connect("localhost", "root", "root", "MMP");

// Check connection
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}


// gets the highscore from JS
$highscore = $_POST['score'];
$player = $_POST['player'];


mysqli_query($connect, "INSERT INTO Score (playername, highscore) VALUES ('$player', '$highscore')");


$result = mysqli_query($connect, "SELECT DISTINCT * FROM Score ORDER BY highscore DESC LIMIT 0, 10");


echo "<table border='1'>
<tr>
<th>Playername</th>
<th>Score</th>
</tr>";
?>

<h1>HIGHSCORE</h1>

<h3>...The Top Ten, Baby!</h3>

<?php
while ($row = mysqli_fetch_array($result)) {
    echo "<tr>";
    echo "<td>" . $row['playername'] . "</td>";
    echo "<td>" . $row['highscore'] . "</td>";
    echo "</tr>";
}
echo "</table>";

mysqli_close($connect);
?>

<br>

<!--TODO: Links as Button-->
<a href="game.html">Play Again!</a>
</body>
</html>