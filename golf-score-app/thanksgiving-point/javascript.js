let playerCount = 0;

window.onload = function() {
    fetch('https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course11819.json')
        .then(response => response.json())
        .then(data => {
            let table = document.getElementById('scorecard');
            let headerRow = table.insertRow(0);
            let holeHeaderCell = headerRow.insertCell(0);
            holeHeaderCell.innerHTML = 'Hole #';
            for (let i = 1; i <= 18; i++) {
                let cell = headerRow.insertCell(i);
                cell.innerHTML = 'Hole ' + i;
            }
            headerRow.insertCell(19).innerHTML = 'Out';
            headerRow.insertCell(20).innerHTML = 'In';
            headerRow.insertCell(21).innerHTML = 'Total';

            data.holes[0].teeBoxes.forEach((teeBox, index) => {
                let row = table.insertRow(-1);
                let cell = row.insertCell(0);
                cell.innerHTML = teeBox.teeType;
                if (index === 0) {
                    cell.classList.add('pro');
                }
                if (index === 2) {
                    cell.classList.add('men-header');
                }
                data.holes.forEach((hole, i) => {
                    let cell = row.insertCell(-1);
                    cell.innerHTML = hole.teeBoxes[index].yards + ' yds';
                    if(hole.teeBoxes[index].teeHexColor) {
                        cell.style.backgroundColor = hole.teeBoxes[index].teeHexColor;
                        cell.style.color = '#ffffff';
                    }
                    if (index === 2) {
                        cell.style.color = 'blue';
                    }
                });

                // Add row for handicap
                let hcpRow = table.insertRow(-1);
                let hcpCell = hcpRow.insertCell(0);
                hcpCell.innerHTML = 'Handicap';
                data.holes.forEach((hole, i) => {
                    let cell = hcpRow.insertCell(-1);
                    cell.innerHTML = hole.teeBoxes[index].hcp;
                });
            });

            let row = table.insertRow(-1);
            let cell = row.insertCell(0);
            cell.innerHTML = 'Par';
            let parOut = 0;
            let parIn = 0;
            data.holes.forEach((hole, i) => {
                let cell = row.insertCell(-1);
                let par = hole.teeBoxes[0].par;
                cell.innerHTML = 'Par ' + par;
                if (i < 9) {
                    parOut += par;
                } else {
                    parIn += par;
                }
            });
            row.insertCell(19).innerHTML = 'Par Out: ' + parOut;
            row.insertCell(20).innerHTML = 'Par In: ' + parIn;
            row.insertCell(21).innerHTML = 'Par Total: ' + (parOut + parIn);
        })
        .catch(error => console.error('Error:', error));
};

function addUser() {
    if (playerCount >= 4) {
        return;
    }

    let route = document.getElementById('userSelect').value;
    let color;

    switch(route) {
        case "pro":
            color = "#443C30";
            break;
        case "champion":
            color = "#6e869e";
            break;
        case "men":
            color = "#ffffff";
            break;
        case "women":
            color = "#ff0000";
            break;
        default:
            color = "white";
            break;
    }

    playerCount++;
    let table = document.getElementById('scorecard');
    let playerName = 'Player ' + playerCount;
    let playerRow = table.insertRow(-1);
    let nameCell = playerRow.insertCell(0);
    nameCell.innerHTML = '<input type="text" id="player-' + playerCount + '-name" value="' + playerName + '">';
    nameCell.style.backgroundColor = color;
    for (let i = 1; i <= 18; i++) {
        let cell = playerRow.insertCell(i);
        cell.innerHTML = '<input type="number" min="0" id="score-' + playerCount + '-' + i + '" onchange="calculateTotal(' + playerCount + ')">';
        cell.style.backgroundColor = color;
    }
    let outCell = playerRow.insertCell(19);
    outCell.id = 'out-' + playerCount;
    outCell.style.backgroundColor = color;
    let inCell = playerRow.insertCell(20);
    inCell.id = 'in-' + playerCount;
    inCell.style.backgroundColor = color;
    let totalCell = playerRow.insertCell(21);
    totalCell.id = 'total-' + playerCount;
    totalCell.style.backgroundColor = color;
    document.getElementById('total-' + playerCount).innerText = playerName + ' Total: 0';

    if (playerCount >= 4) {
        document.getElementById('addUserButton').disabled = true;
    }
}

function calculateTotal(playerNumber) {
    let total = 0;
    let out = 0;
    let inn = 0;
    let playerName = document.getElementById('player-' + playerNumber + '-name').value;
    for (let i = 1; i <= 18; i++) {
        let scoreInput = document.getElementById('score-' + playerNumber + '-' + i);
        if (scoreInput.value) {
            let score = parseInt(scoreInput.value);
            total += score;
            if (i <= 9) {
                out += score;
            } else {
                inn += score;
            }
        }
    }
    document.getElementById('out-' + playerNumber).innerText = out;
    document.getElementById('in-' + playerNumber).innerText = inn;
    document.getElementById('total-' + playerNumber).innerText = playerName + ' Total: ' + total;
}
