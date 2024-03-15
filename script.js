document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
  
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value;
      if (taskText.trim() !== '') {
        const currentTime = new Date().toLocaleTimeString();
        const task = { text: taskText, completed: false, createdAt: currentTime, closedAt: 'Not closed yet' };
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        taskInput.value = '';
      }
    });
  
    function renderTasks() {
      taskList.innerHTML = '';
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        li.textContent = `${task.text} (Created at: ${task.createdAt}, Closed at: ${task.closedAt ? task.closedAt : 'Not closed yet'})`;
        if (task.completed) {
          li.style.textDecoration = 'line-through';
        }
        li.addEventListener('click', () => {
          tasks[index].completed = !tasks[index].completed;
          if (tasks[index].completed) {
            tasks[index].closedAt = new Date().toLocaleTimeString();
          } else {
            tasks[index].closedAt = 'Not closed yet';
          }
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks();
        });
        li.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          tasks.splice(index, 1);
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks();
        });
        taskList.appendChild(li);
      });
    }
  
    renderTasks();
  });