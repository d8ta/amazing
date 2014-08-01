/**
 * Gives the highscore value to the input.html form to send it to the
 * server for PHP SQL queries
 */
function myScore() {
    document.getElementById('score').value = localStorage.highscore;
}