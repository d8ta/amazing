/**
 * Created by danielraudschus on 17.04.14.
 *
 * Codebsp. : http://rosettacode.org/wiki/Maze_generation#J
 *
 */
function maze(x, y) {

    // Prüfen ob Canvas/Fläche unter Null, wenn, dann Fehlermeldung und Abbruch durch return;
    var n = x * y - 1;
    if (n < 0) {
        alert("illegal maze dimensions");
        return;
    }

    /**
     * Die Gesamtfläche wird in Arrays aufgeteilt (horizontal und vertikal) -> Rastern d. Canvas
     * @type {Array}
     */
    // für jedes X wird ein leeres Array in horiz[] eingesetzt -> horiz[0] = [] ..... horiz[n] = [];
    var horiz = [];
    for (var j = 0; j < x + 1; j++) {
        horiz[j] = [];
    }
    // für jedes Y wird ein leeres Array in verti[] eingesetzt;
    var verti = [];
    for (var j = 0; j < y + 1; j++) {
        verti[j] = [];
    }


    // Mehrdim. Array mit Zufallspunkten (4 mögl. -> alle vier Ecken des Lab. mögl.)
    var here = [Math.floor(Math.random() * x), Math.floor(Math.random() * y)];

    // path-Array wird mit here-Array befüllt
    var path = [here];

    var unvisited = [];
    for (var j = 0; j < x + 2; j++) {

        // jede X Stelle von unvisited mit [] befüllen, läuft bis eine Stelle grösser als X ist (weil Lab. verlassen werden soll, bzw. letzte Wand durchbrochen werden soll);
        unvisited[j] = [];

        // alle Y Stellen durchlaufen, läuft bis genau zur letzten Y Stelle
        for (var k = 0; k < y + 1; k++) {
            // Legt etwas auf den Stack wenn nicht ausserhalb vom Lab. und wenn nicht an den Startpositionen
            unvisited[j].push(j > 0 && j < x + 1 && k > 0 && (j != here[0] + 1 || k != here[1] + 1));
        }
    }

    while (0 < n) {

        // Füllt potential-Array mit Stellen rund um Startpkt.
        var potential = [
            [here[0] + 1, here[1]],
            [here[0], here[1] + 1],
            [here[0] - 1, here[1]],
            [here[0], here[1] - 1]
        ];


        var neighbors = [];
        // Durchläuft alle 4 potentiellen Nachbarn der Startpos.
        for (var j = 0; j < 4; j++) {

            // Prüft Potentielle Partner und falls passend (also innerhalb d. Grid) wird dieser Partner als Nachbar auf den Stack gelegt;
            if (unvisited[potential[j][0] + 1][potential[j][1] + 1]) {
                neighbors.push(potential[j]);
            }

            // Nach und nach alle Nachbarn besuchen bis das gesamte Raster durchlaufen wurde;
            if (neighbors.length) {
                n = n - 1;
                next = neighbors[Math.floor(Math.random() * neighbors.length)];
                unvisited[next[0] + 1][next[1] + 1] = false;
                if (next[0] == here[0])
                    horiz[next[0]][(next[1] + here[1] - 1) / 2] = true;
                else
                    verti[(next[0] + here[0] - 1) / 2][next[1]] = true;
                path.push(here = next);
            } else {
                here = path.pop();
            }
        }
    }
    return {x: x, y: y, horiz: horiz, verti: verti};
}

function display(m) {
    var text = [];
    for (var j = 0; j < m.x * 2 + 1; j++) {
        var line = [];
        if (0 == j % 2)
            for (var k = 0; k < m.y * 4 + 1; k++)
                if (0 == k % 4)
                    line[k] = '+';
                else if (j > 0 && m.verti[j / 2 - 1][Math.floor(k / 4)])
                    line[k] = ' ';
                else
                    line[k] = '-';
        else
            for (var k = 0; k < m.y * 4 + 1; k++)
                if (0 == k % 4)
                    if (k > 0 && m.horiz[(j - 1) / 2][k / 4 - 1])
                        line[k] = ' ';
                    else
                        line[k] = '|';
                else
                    line[k] = ' ';
        if (0 == j) line[1] = line[2] = line[3] = ' ';
        if (m.x * 2 - 1 == j) line[4 * m.y] = ' ';
        text.push(line.join('') + '\r\n');
    }
    return text.join('');
}

document.getElementById('out').innerHTML= display(maze(8,11));

