/**
 * Gives highscore value to the form in input.html to send it to the
 * server for PHP SQL queries
 */
console.log(localStorage);
function myScore() {
    document.getElementById('score').value = localStorage.highscore;
}