// Add an event listener for the "Add Goal" button
document.getElementById('add-goal-btn').addEventListener('click', function () {
    const goalText = prompt('What is your goal?');
    if (goalText) {
        addGoal(goalText);
    }
});

// Function to add a new goal to the list
function addGoal(goal) {
    const goalList = document.getElementById('goal-list');
    const listItem = document.createElement('li');
    listItem.textContent = goal;

    // Add delete button to each goal
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.style.backgroundColor = '#ff5252'; // Red for delete button
    deleteBtn.addEventListener('click', function () {
        goalList.removeChild(listItem);
    });

    listItem.appendChild(deleteBtn);
    goalList.appendChild(listItem);
}
