document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priorityInput');
    const startDateInput = document.getElementById('startDateInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const taskForm = document.getElementById('taskForm');
    const taskTable = document.getElementById('taskTable');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage on page load
    loadTasks();

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const taskText = taskInput.value.trim();
        const priority = priorityInput.value;
        const startDate = startDateInput.value;
        const dueDate = dueDateInput.value;

        if (taskText !== '') {
            // Save the task to localStorage
            saveTask({ taskText, priority, startDate, dueDate });

            // Display the task in the table
            displayTask({ taskText, priority, startDate, dueDate });

            // Clear the input fields
            taskInput.value = '';
            priorityInput.value = 'low';
            startDateInput.value = '';
            dueDateInput.value = '';
        }
    });

    function saveTask(task) {
        let tasks = getTasksFromStorage();

        // Add the new task to the array
        tasks.push(task);

        // Save the updated array back to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function displayTask(task) {
        const taskRow = document.createElement('tr');
        taskRow.innerHTML = `
            <td>${taskList.children.length + 1}</td>
            <td>${task.taskText}</td>
            <td>${task.priority}</td>
            <td>${task.startDate}</td>
            <td>${task.dueDate}</td>
            <td><input type="checkbox" /></td>
            <td><textarea></textarea></td>
            <td><button onclick="deleteTask(${taskList.children.length})">Delete</button></td>
        `;
        taskList.appendChild(taskRow);
    }

    function loadTasks() {
        let tasks = getTasksFromStorage();

        tasks.forEach(displayTask);
    }

    function getTasksFromStorage() {
        const storedTasks = localStorage.getItem('tasks');

        return storedTasks ? JSON.parse(storedTasks) : [];
    }

    // Function to delete a task
    window.deleteTask = function (index) {
        let tasks = getTasksFromStorage();

        // Remove the task at the specified index
        tasks.splice(index - 1, 1);

        // Save the updated array back to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Refresh the table
        refreshTaskTable();
    };

    // Function to refresh the task table
    function refreshTaskTable() {
        taskList.innerHTML = ''; // Clear the existing table rows
        loadTasks(); // Load tasks and add them to the table again
    }
});



   

