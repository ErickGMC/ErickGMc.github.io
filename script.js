let buttonsVisible = true;
let activeOptionsCount = 0; // Contador de opciones activas para la barra de progreso

// Función para actualizar el progreso y cambiar el color de la barra
function updateProgress() {
    const options = document.querySelectorAll('.option-item');
    const progressBar = document.getElementById('progress-bar');
    const totalOptions = options.length;
    
    // Calcular el progreso como porcentaje
    const progress = (activeOptionsCount / totalOptions) * 100;
    progressBar.style.width = `${progress}%`;

    // Cambiar el color de la barra de progreso de rojo a verde
    const red = Math.max(0, 255 - Math.floor(2.55 * progress));
    const green = Math.min(128, Math.floor(1.28 * progress));
    progressBar.style.backgroundColor = `rgb(${red}, ${green}, 0)`;

    // Si el progreso está completo, añadir la animación de brillo
    if (progress === 100) {
        progressBar.classList.add("complete");
    } else {
        progressBar.classList.remove("complete");
    }
}

// Función para agregar una nueva opción
function addOption() {
    const optionName = document.getElementById('optionName').value.trim();
    const optionsContainer = document.getElementById('options-container');

    if (optionName === "") {
        alert("Por favor, ingrese un nombre para la opción.");
        return;
    }

    // Crear un botón que representa una opción
    const optionItem = document.createElement("div");
    optionItem.className = "option-item";
    optionItem.textContent = optionName;

    // Alternar color y progreso al hacer clic
    optionItem.onclick = () => {
        if (optionItem.classList.contains("active")) {
            optionItem.classList.remove("active");
            activeOptionsCount--; // Reducir el contador activo
        } else {
            optionItem.classList.add("active");
            activeOptionsCount++; // Aumentar el contador activo
        }
        updateProgress(); // Actualizar la barra de progreso
    };

    // Crear botones de edición y eliminación
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.className = "edit-button";
    editButton.onclick = (event) => {
        event.stopPropagation();
        editOption(optionItem);
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.className = "delete-button";
    deleteButton.onclick = (event) => {
        event.stopPropagation();
        deleteOption(optionItem);
    };

    // Añadir botones de edición y eliminación
    optionItem.appendChild(editButton);
    optionItem.appendChild(deleteButton);

    // Añadir el botón de opción al contenedor de opciones
    optionsContainer.appendChild(optionItem);

    // Limpiar el campo de texto
    document.getElementById('optionName').value = "";
    document.getElementById('optionName').focus();
    updateProgress();
}

// Función para editar una opción existente
function editOption(optionItem) {
    const optionName = optionItem.childNodes[0].textContent.trim();
    document.getElementById('optionName').value = optionName;
    document.getElementById('optionName').focus();
    editElement = optionItem;
}

// Función para eliminar una opción
function deleteOption(optionItem) {
    if (optionItem.classList.contains("active")) {
        activeOptionsCount--; // Reducir el contador activo si el elemento estaba activo
    }
    optionItem.remove();
    updateProgress();
}

// Función para alternar visibilidad de los botones de edición y eliminación
function toggleButtons() {
    buttonsVisible = !buttonsVisible;
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.classList.toggle("buttons-visible", buttonsVisible);
}

// Evento para detectar "Enter" y agregar opción automáticamente
document.getElementById('optionName').addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        addOption();
    }
});
