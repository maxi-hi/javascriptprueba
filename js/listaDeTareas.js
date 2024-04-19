const formularioTarea = document.getElementById('task-form');
const inputTarea = document.getElementById('task-input');
const listaTareas = document.getElementById('task-list');

function crearElementoTarea(textoTarea) {
    // Limitar la longitud de la tarea si es demasiado larga
    if (textoTarea.length > 50) {
        textoTarea = textoTarea.substring(0, 47) + '...';
    }

    const elementoTarea = document.createElement('li');
    elementoTarea.classList.add('tarea', 'bg-white', 'rounded', 'shadow', 'p-4', 'mb-2', 'flex', 'justify-between', 'items-center');

    const textoElementoTarea = document.createElement('span');
    textoElementoTarea.classList.add('texto-tarea');
    textoElementoTarea.textContent = textoTarea;

    const accionesTarea = document.createElement('div');
    accionesTarea.classList.add('acciones-tarea');

    const botonCompletar = document.createElement('button');
    botonCompletar.classList.add('bg-green-500', 'hover:bg-green-600', 'text-white', 'px-2', 'py-1', 'rounded');
    botonCompletar.innerHTML = '<i class="bi bi-check"></i>';

    const botonEliminar = document.createElement('button');
    botonEliminar.classList.add('bg-red-500', 'hover:bg-red-600', 'text-white', 'px-2', 'py-1', 'rounded');
    botonEliminar.innerHTML = '<i class="bi bi-trash"></i>';

    accionesTarea.appendChild(botonCompletar);
    accionesTarea.appendChild(botonEliminar);
    elementoTarea.appendChild(textoElementoTarea);
    elementoTarea.appendChild(accionesTarea);
    
    elementoTarea.addEventListener('click', (e) => {
        const objetivo = e.target.closest('button');
        if (objetivo) {
            manejarEventoTarea(elementoTarea, objetivo);
        }
    });

    return elementoTarea;
}

function manejarEventoTarea(elementoTarea, objetivo) {
    const textoElementoTarea = elementoTarea.querySelector('.texto-tarea');
    if (objetivo.classList.contains('bg-green-500')) {
        // Completar tarea
        elementoTarea.classList.toggle('completada');
        if (elementoTarea.classList.contains('completada')) {
            textoElementoTarea.style.textDecoration = 'line-through';
            mostrarMensajeToast("¡Tarea completada!");
        } else {
            textoElementoTarea.style.textDecoration = 'none';
        }
        guardarTareasEnLocalStorage();
    } else if (objetivo.classList.contains('bg-red-500')) {
        // Eliminar tarea
        elementoTarea.remove();
        guardarTareasEnLocalStorage(); // Guardar las tareas en localStorage después de eliminar una tarea
        mostrarMensajeToast("¡Tarea eliminada!");
    }
}

function mostrarMensajeToast(mensaje) {
    Toastify({
        text: mensaje,
        duration: 3000,
        gravity: "bottom", 
        position: "right", 
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
}

function guardarTareasEnLocalStorage() {
    const tareas = listaTareas.innerHTML;
    localStorage.setItem('tareas', tareas);
}

function cargarTareasDesdeLocalStorage() {
    const tareas = localStorage.getItem('tareas');
    if (tareas) {
        listaTareas.innerHTML = tareas;
        const elementosTarea = listaTareas.querySelectorAll('.tarea');
        elementosTarea.forEach(elementoTarea => {
            const botones = elementoTarea.querySelectorAll('button');
            botones.forEach(boton => {
                boton.addEventListener('click', () => {
                    manejarEventoTarea(elementoTarea, boton);
                });
            });
        });
    }
}

formularioTarea.addEventListener('submit', (e) => {
    e.preventDefault();
    const textoTarea = inputTarea.value.trim();
    if (textoTarea !== '') {
        const elementoTarea = crearElementoTarea(textoTarea);
        listaTareas.appendChild(elementoTarea);
        inputTarea.value = '';

        guardarTareasEnLocalStorage();
        mostrarMensajeToast("¡Tarea agregada!");
    }
});

cargarTareasDesdeLocalStorage();
