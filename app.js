let streak = 0;
let dailyGoalsCompleted = 0;
let quarterlyGoalsCompleted = 0;
const dailyGoalTarget = 5;
const quarterlyGoalTarget = 50;
let timer;
let timerRunning = false;
let isPaused = false;
const quarterlyGoals = [];
const maxDailyGoals = 3; // Limit daily goals to 3

// Add Daily Goal
document.getElementById('add-goal-btn').addEventListener('click', function () {
    const goalText = prompt('What is your goal?');
    const goalTime = parseInt(prompt('How many minutes will this take? (Max 25)'), 10);

    if (goalText && goalTime && goalTime <= 25) {
        addGoal(goalText, goalTime);
    } else {
        alert('Please enter a valid goal and time (1-25 minutes).');
    }
});

// Add Quarterly Goal
document.getElementById('set-quarterly-goals-btn').addEventListener('click', function () {
    if (quarterlyGoals.length >= 3) {
        alert('You can only set up to 3 quarterly goals.');
        return;
    }

    const goalText = prompt('What is your quarterly goal?');
    if (goalText) {
        quarterlyGoals.push(goalText);
        displayQuarterlyGoals();
        populateDailyGoals();
    }
});

function displayQuarterlyGoals() {
    const quarterlyGoalsList = document.getElementById('quarterly-goals-list');
    quarterlyGoalsList.innerHTML = ''; // Clear list
    quarterlyGoals.forEach((goal, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Q${index + 1}: ${goal}`;
        quarterlyGoalsList.appendChild(listItem);
    });
}

function populateDailyGoals() {
    const dailyGoalsList = document.getElementById('goal-list');
    dailyGoalsList.innerHTML = ''; // Clear today's goals

    const dailyGoals = quarterlyGoals.slice(0, maxDailyGoals); // Select first 3 goals
    dailyGoals.forEach((goal) => addGoal(goal, 25)); // Default 25 minutes for focus
}

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

    const pauseBtn = document.createElement('button');
    pauseBtn.textContent = 'Pause';
    pauseBtn.id = 'pause-timer-btn';
    document.getElementById('timer-section').appendChild(pauseBtn);

    pauseBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
    });

    timer = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            display.textContent = formatTime(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(timer);
                timerRunning = false;
                display.textContent = '00:00';
                markGoalComplete(goalElement);
                pauseBtn.remove();
            }
        }
    }, 1000);
}

function markGoalComplete(goalElement) {
    goalElement.style.textDecoration = 'line-through';
    goalElement.querySelector('button').remove(); // Remove "Focus" button
    goalElement.classList.add('completed'); // Add animation
    alert('Congratulations! Goal Completed!');
    streak++;
    dailyGoalsCompleted++;
    quarterlyGoalsCompleted++;
    updateProgress();
    updateStreak();
}

function updateProgress() {
    const dailyProgress = document.getElementById('daily-progress');
    const dailyProgressText = document.getElementById('daily-progress-text');
    dailyProgress.value = dailyGoalsCompleted;
    dailyProgressText.textContent = `${dailyGoalsCompleted}/${dailyGoalTarget} Goals Completed`;

    const quarterlyProgress = document.getElementById('quarterly-progress');
    const quarterlyProgressText = document.getElementById('quarterly-progress-text');
    quarterlyProgress.value = quarterlyGoalsCompleted;
    quarterlyProgressText.textContent = `${quarterlyGoalsCompleted}/${quarterlyGoalTarget} Goals Completed`;
}

function updateStreak() {
    document.getElementById('streak-count').textContent = `Current Streak: ${streak}`;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
