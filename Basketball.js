let scores = [0, 0];
let timerSeconds = 10 * 60;
let timerInterval;
let gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];

function addScore(team, points) {
    scores[team - 1] += points;
    document.getElementById(`score${team}`).value = scores[team - 1];
}

function addTime(seconds) {
    timerSeconds += seconds;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    document.getElementById('timer').value = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    } else {
        timerInterval = setInterval(() => {
            if (timerSeconds > 0) {
                timerSeconds--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
            }
        }, 1000);
    }
}

function saveGame() {
    const team1 = document.getElementById('team1').value || 'Team 1';
    const team2 = document.getElementById('team2').value || 'Team 2';
    const game = {
        team1,
        team2,
        score1: scores[0],
        score2: scores[1],
        date: new Date().toLocaleString()
    };
    gameHistory.unshift(game);
    if (gameHistory.length > 10) gameHistory.pop();
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    gameHistory.forEach(game => {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.textContent = `${game.date}: ${game.team1} ${game.score1} - ${game.score2} ${game.team2}`;
        historyList.appendChild(li);
    });
}

updateTimerDisplay();
updateHistoryDisplay();


document.getElementById('score1').addEventListener('input', function() {
    scores[0] = parseInt(this.value) || 0;
});

document.getElementById('score2').addEventListener('input', function() {
    scores[1] = parseInt(this.value) || 0;
});


document.getElementById('timer').addEventListener('input', function() {
    const [minutes, seconds] = this.value.split(':').map(Number);
    timerSeconds = minutes * 60 + seconds;
});


document.getElementById('team1').addEventListener('input', function() {});
document.getElementById('team2').addEventListener('input', function() {});
