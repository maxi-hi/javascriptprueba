// Selecciona los elementos relevantes del DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Función para crear un nuevo elemento de tarea
function createTaskElement(taskText) {
    // Limita la longitud de la tarea si es demasiado larga
    if (taskText.length > 50) {
        taskText = taskText.substring(0, 47) + '...';
    }

    // Crea los elementos de la tarea
    const taskItem = document.createElement('li');
    taskItem.classList.add('task', 'bg-white', 'rounded', 'shadow', 'p-4', 'mb-2', 'flex', 'justify-between', 'items-center');

    const taskTextElement = document.createElement('span');
    taskTextElement.classList.add('task-text');
    taskTextElement.textContent = taskText;

    const taskActions = document.createElement('div');
    taskActions.classList.add('task-actions');

    const completeButton = document.createElement('button');
    completeButton.classList.add('bg-green-500', 'hover:bg-green-600', 'text-white', 'px-2', 'py-1', 'rounded');
    completeButton.innerHTML = '<i class="bi bi-check"></i>';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('bg-red-500', 'hover:bg-red-600', 'text-white', 'px-2', 'py-1', 'rounded');
    deleteButton.innerHTML = '<i class="bi bi-trash"></i>';

    // Agrega los elementos al elemento de la tarea
    taskActions.appendChild(completeButton);
    taskActions.appendChild(deleteButton);
    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(taskActions);
    
    // Asociar evento de completar o eliminar tarea a toda la tarea
    taskItem.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (target) {
            handleTaskEvent(taskItem, target);
        }
    });

    return taskItem;
}

// Función para manejar los eventos de la tarea (completar o eliminar)
function handleTaskEvent(taskItem, target) {
    const taskTextElement = taskItem.querySelector('.task-text');
    if (target.classList.contains('bg-green-500')) {
        // Completar tarea
        taskItem.classList.toggle('completed');
        if (taskItem.classList.contains('completed')) {
            taskTextElement.style.textDecoration = 'line-through';
            showToastMessage("¡Tarea completada!");
        } else {
            taskTextElement.style.textDecoration = 'none';
        }
        saveTasksToLocalStorage(); // Guardar las tareas en localStorage después de completar una tarea
    } else if (target.classList.contains('bg-red-500')) {
        // Eliminar tarea
        taskItem.remove();
        saveTasksToLocalStorage(); // Guardar las tareas en localStorage después de eliminar una tarea
        showToastMessage("¡Tarea eliminada!");
    }
}

// Función para mostrar un mensaje de Toastify personalizado
function showToastMessage(message) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
}

// Función para guardar las tareas en localStorage
function saveTasksToLocalStorage() {
    const tasks = taskList.innerHTML;
    localStorage.setItem('tasks', tasks);
}

// Función para cargar las tareas desde localStorage al cargar la página
function loadTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
        taskList.innerHTML = tasks;
        // Agregar eventos a los nuevos elementos de tarea cargados desde localStorage
        const taskItems = taskList.querySelectorAll('.task');
        taskItems.forEach(taskItem => {
            const buttons = taskItem.querySelectorAll('button');
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    handleTaskEvent(taskItem, button);
                });
            });
        });
    }
}

// Función para manejar la presentación del formulario de tareas
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskElement = createTaskElement(taskText);
        taskList.appendChild(taskElement);
        taskInput.value = '';

        saveTasksToLocalStorage(); // Guardar las tareas en localStorage después de agregar una nueva tarea
        showToastMessage("¡Tarea agregada!");
    }
});

// Cargar las tareas almacenadas en localStorage al cargar la página
loadTasksFromLocalStorage();
