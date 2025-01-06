let streak = 0;
let timer;
let timerRunning = false;

document.getElementById('add-goal-btn').addEventListener('click', function () {
    const goalText = prompt('What is your goal?');
    const goalTime = parseInt(prompt('How many minutes will this take? (Max 25)'), 10);

    if (goalText && goalTime && goalTime <= 25) {
        addGoal(goalText, goalTime);
    } else {
        alert('Please enter a valid goal and time (1-25 minutes).');
    }
});

function addGoal(goal, time) {
    const goalList = document.getElementById('goal-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${goal} - ${time} min`;

    const startBtn = document.createElement('button');
    startBtn.textContent = 'Focus';
    startBtn.addEventListener('click', function () {
        startTimer(time, listItem);
    });

    listItem.appendChild(startBtn);
    goalList.appendChild(listItem);
}

function startTimer(minutes, goalElement) {
    if (timerRunning) {
        alert('A timer is already running.');
        return;
    }

    const display = document.getElementById('timer-display');
    let timeLeft = minutes * 60;

    display.textContent = formatTime(timeLeft);
    timerRunning = true;

    timer = setInterval(() => {
        timeLeft--;
        display.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            timerRunning = false;
            display.textContent = '00:00';
            markGoalComplete(goalElement);
        }
    }, 1000);
}

function markGoalComplete(goalElement) {
    goalElement.style.textDecoration = 'line-through';
    alert('Congratulations! Goal Completed!');
    streak++;
    updateStreak();
}

function updateStreak() {
    document.getElementById('streak-count').textContent = `Current Streak: ${streak}`;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
