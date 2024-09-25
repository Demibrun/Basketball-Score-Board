let scores = [0, 0];
let timerSeconds = 10 * 60;
let timerInterval;

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
    document.getElementById('timer').textContent = 
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

updateTimerDisplay();

// Add event listeners for score inputs
document.getElementById('score1').addEventListener('input', function() {
    scores[0] = parseInt(this.value) || 0;
});

document.getElementById('score2').addEventListener('input', function() {
    scores[1] = parseInt(this.value) || 0;
});