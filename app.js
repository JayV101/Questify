let streak = 0;
let dailyGoalsCompleted = 0;
let quarterlyGoalsCompleted = 0;
const dailyGoalTarget = 5; // Example target for daily goals
const quarterlyGoalTarget = 50; // Example target for quarterly goals
let timer;
let timerRunning = false;

// Add Goal Button
document.getElementById('add-goal-btn').addEventListener('click', function () {
    const goalText = prompt('What is your goal?');
    const goalTime = parseInt(prompt('How many minutes will this take? (Max 25)'), 10);

    if (goalText && goalTime && goalTime <= 25) {
        addGoal(goalText, goalTime);
    } else {
        alert('Please enter a valid goal and time (1-25 minutes).');
    }
});

// Function to Add a Goal
function addGoal(goal, time) {
    const goalList = document.getElementById('goal-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${goal} - ${time} min`;

    // Create Focus Button
    const startBtn = document.createElement('button');
    startBtn.textContent = 'Focus';
    startBtn.addEventListener('click', function () {
        startTimer(time, listItem);
    });

    listItem.appendChild(startBtn);
    goalList.appendChild(listItem);
}

// Timer Functionality
function startTimer(minutes, goalElement) {
    if (timerRunning) {
        alert('A timer is already running.');
        return;
    }

    const display = document.getElementById('timer-display');
    let timeLeft = minutes * 60;

    // Display Initial Time
    display.textContent = formatTime(timeLeft);
    timerRunning = true;

    timer = setInterval(() => {
        timeLeft--;
        display.textContent = formatTime(timeLeft);

        // When Timer Ends
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerRunning = false;
            display.textContent = '00:00';
            markGoalComplete(goalElement);
        }
    }, 1000);
}

// Mark Goal as Complete
function markGoalComplete(goalElement) {
    goalElement.style.textDecoration = 'line-through';
    goalElement.querySelector('button').remove(); // Remove the "Focus" button
    alert('Congratulations! Goal Completed!');
    streak++;
    dailyGoalsCompleted++;
    quarterlyGoalsCompleted++;
    updateProgress();
    updateStreak();
}

// Update Streak Counter
function updateStreak() {
    document.getElementById('streak-count').textContent = `Current Streak: ${streak}`;
}

// Update Progress Bars
function updateProgress() {
    // Update daily progress
    const dailyProgress = document.getElementById('daily-progress');
    const dailyProgressText = document.getElementById('daily-progress-text');
    dailyProgress.value = dailyGoalsCompleted;
    dailyProgressText.textContent = `${dailyGoalsCompleted}/${dailyGoalTarget} Goals Completed`;

    // Update quarterly progress
    const quarterlyProgress = document.getElementById('quarterly-progress');
    const quarterlyProgressText = document.getElementById('quarterly-progress-text');
    quarterlyProgress.value = quarterlyGoalsCompleted;
    quarterlyProgressText.textContent = `${quarterlyGoalsCompleted}/${quarterlyGoalTarget} Goals Completed`;
}

// Format Time for Timer
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
