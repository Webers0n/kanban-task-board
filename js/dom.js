function addTask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    if (!title || !description) return alert("Preencha todos os campos!");

    const task = {
        title,
        description,
        status: "todo"
    };

    saveTask(task);
    renderTask(task);
    document.getElementById("title").value = '';
    document.getElementById("description").value = '';
}

function renderAllTasks() {
    const tasks = getTasks();
    tasks.forEach(renderTask);
}

function renderTask(task) {
    const container = document.getElementById(task.status);
    const div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
    <button class="delete" onclick="removeTask(this, '${task.title}')">🗑️</button>
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    ${generateMoveButton(task)}
  `;

    container.appendChild(div);
}

function generateMoveButton(task) {
    let nextStatus = "";
    if (task.status === "todo") nextStatus = "doing";
    else if (task.status === "doing") nextStatus = "done";
    else return ""; // Se estiver em "done", não mostra botão

    return `<button onclick="moveTask('${task.title}', '${nextStatus}')">Mover para ${statusLabel(nextStatus)}</button>`;
}

function statusLabel(status) {
    if (status === "todo") return "A Fazer";
    if (status === "doing") return "Fazendo";
    if (status === "done") return "Concluído";
}

function moveTask(title, newStatus) {
    const tasks = getTasks();
    const task = tasks.find(t => t.title === title);
    if (task) {
        task.status = newStatus;
        updateTasks(tasks);
        clearAllColumns();
        renderAllTasks();
    }
}

function removeTask(button, title) {
    deleteTask(title);
    button.parentElement.remove();
}

function clearAllColumns() {
    document.getElementById("todo").innerHTML = "";
    document.getElementById("doing").innerHTML = "";
    document.getElementById("done").innerHTML = "";
}
