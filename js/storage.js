function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
}

function getTasks() {
    const tasks = localStorage.getItem("kanbanTasks");
    return tasks ? JSON.parse(tasks) : [];
}

function updateTasks(tasks) {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
}

function deleteTask(title) {
    let tasks = getTasks();
    tasks = tasks.filter(t => t.title !== title);
    updateTasks(tasks);
}
