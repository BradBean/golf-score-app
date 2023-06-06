let playerCount = 0;
let playerNames = [];

window.onload = function() {
    fetch('https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course11819.json')
        .then(response => response.json())
        .then(data => {
            let table = document.getElementById('scorecard');
            let headerRow = table.insertRow(0);
            let holeHeaderCell = headerRow.insertCell(0);
            holeHeaderCell.innerHTML = 'Hole #';
            for (let i = 1; i <= data.holes.length; i++) {
                let cell = headerRow.insertCell(i);
                cell.innerHTML = 'Hole ' + i;
            }
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
            });
            let row = table.insertRow(-1);
            let cell = row.insertCell(0);
            cell.innerHTML = 'Par';
            data.holes.forEach((hole, i) => {
                let cell = row.insertCell(-1);
                cell.innerHTML = 'Par ' + hole.teeBoxes[0].par;
            });
        })
        .catch(error => console.error('Error:', error));
};

function addUser() {
    if (playerCount >= 4) {
        return;
    }
    playerCount++;
    let table = document.getElementById('scorecard');
    let playerRow = table.insertRow(-1);
    let nameCell = playerRow.insertCell(0);
    nameCell.innerHTML = '<input type="text" placeholder="Player ' + playerCount + '" id="name-' + playerCount + '" onchange="updatePlayerName(' + playerCount + ')">';
    for (let i = 1; i <= 18; i++) {
        let cell = playerRow.insertCell(i);
        cell.innerHTML = '<input type="number" min="0" id="score-' + playerCount + '-' + i + '" onchange="calculateTotal(' + playerCount + ')">';
    }
    if (playerCount >= 4) {
        document.getElementById('addUserButton').disabled = true;
    }
}

function updatePlayerName(playerNumber) {
    let nameInput = document.getElementById('name-' + playerNumber);
    playerNames[playerNumber - 1] = nameInput.value || 'Player ' + playerNumber;
    calculateTotal(playerNumber);
}

function calculateTotal(playerNumber) {
    let total = 0;
    for (let i = 1; i <= 18; i++) {
        let scoreInput = document.getElementById('score-' + playerNumber + '-' + i);
        if (scoreInput.value) {
            total += parseInt(scoreInput.value);
        }
    }
    document.getElementById('total-' + playerNumber).innerText = (playerNames[playerNumber - 1] || 'Player ' + playerNumber) + '\'s Total: ' + total;
}