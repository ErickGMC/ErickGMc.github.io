let totalParticipatingStudents = 0;
let totalStudents = 0;

const progressBarColors = ['#4db6ac', '#ff8a65', '#ba68c8', '#64b5f6', '#ffd54f'];
let colorIndex = 0;

function updateMainProgress() {
    const mainProgressBar = document.getElementById('main-progress-bar');
    const mainProgressText = document.getElementById('main-progress-text');
    const progressPercentage = totalStudents ? Math.floor((totalParticipatingStudents / totalStudents) * 100) : 0;
    mainProgressBar.style.width = `${progressPercentage}%`;
    mainProgressText.textContent = `${progressPercentage}%`;
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        addStudent();
    }
}

function addStudent(name = "", progress = 0) {
    const studentName = name || document.getElementById('optionName').value.trim();
    const studentsContainer = document.getElementById('students-container');

    if (studentName === "") {
        alert("Por favor, ingrese el nombre del estudiante.");
        return;
    }

    const studentColor = progressBarColors[colorIndex];
    colorIndex = (colorIndex + 1) % progressBarColors.length;

    const studentItem = document.createElement("div");
    studentItem.className = "student-item";

    const nameSpan = document.createElement("span");
    nameSpan.className = "student-name";
    nameSpan.textContent = studentName;

    const progressButton = document.createElement("button");
    progressButton.className = "progress-button";
    progressButton.textContent = "+";

    const decreaseButton = document.createElement("button");
    decreaseButton.className = "progress-button";
    decreaseButton.textContent = "-";

    const editButton = document.createElement("button");
    editButton.className = "progress-button";
    editButton.textContent = "✎";

    const deleteButton = document.createElement("button");
    deleteButton.className = "progress-button";
    deleteButton.textContent = "🗑️";

    let studentProgress = progress;
    let hasParticipated = studentProgress > 0;

    const participationCount = document.createElement("span");
    participationCount.className = "participation-count";
    participationCount.textContent = studentProgress;

    const progressContainer = document.createElement("div");
    progressContainer.className = "student-progress-container";
    const progressBar = document.createElement("div");
    progressBar.className = "student-progress-bar";
    progressBar.style.backgroundColor = studentColor;
    const progressText = document.createElement("span");
    progressText.className = "student-progress-text";
    progressText.textContent = `${studentProgress} / 20`;

    progressContainer.appendChild(progressBar);
    progressContainer.appendChild(progressText);

    const initialPercentage = (studentProgress / 20) * 100;
    progressBar.style.width = `${initialPercentage}%`;

    progressButton.onclick = () => {
        if (studentProgress < 20) {
            studentProgress++;
            const studentPercentage = (studentProgress / 20) * 100;
            progressBar.style.width = `${studentPercentage}%`;
            progressText.textContent = `${studentProgress} / 20`;
            participationCount.textContent = studentProgress;

            if (!hasParticipated && studentProgress > 0) {
                totalParticipatingStudents++;
                hasParticipated = true;
                updateMainProgress();
            }
            saveData();
        }
    };

    decreaseButton.onclick = () => {
        if (studentProgress > 0) {
            studentProgress--;
            const studentPercentage = (studentProgress / 20) * 100;
            progressBar.style.width = `${studentPercentage}%`;
            progressText.textContent = `${studentProgress} / 20`;
            participationCount.textContent = studentProgress;

            if (studentProgress === 0 && hasParticipated) {
                totalParticipatingStudents--;
                hasParticipated = false;
                updateMainProgress();
            }
            saveData();
        }
    };

    editButton.onclick = () => {
        const newName = prompt("Editar nombre del estudiante:", studentName);
        if (newName) {
            nameSpan.textContent = newName;
            saveData();
        }
    };

    deleteButton.onclick = () => {
        studentsContainer.removeChild(studentItem);
        if (hasParticipated) {
            totalParticipatingStudents--;
        }
        totalStudents--;
        updateMainProgress();
        saveData();
    };

    studentItem.appendChild(decreaseButton);
    studentItem.appendChild(progressButton);
    studentItem.appendChild(nameSpan);
    studentItem.appendChild(editButton);
    studentItem.appendChild(deleteButton);
    studentItem.appendChild(progressContainer);
    studentItem.appendChild(participationCount);
    studentsContainer.appendChild(studentItem);

    totalStudents++;
    if (studentProgress > 0) totalParticipatingStudents++;
    updateMainProgress();

    if (!name) {
        document.getElementById('optionName').value = "";
        document.getElementById('optionName').focus();
    }
}

// Función para restablecer todo el progreso a cero, mantener los nombres y recargar la página
function resetProgress() {
    const studentsContainer = document.getElementById('students-container');
    const studentItems = studentsContainer.getElementsByClassName('student-item');
    
    // Restablece el progreso de cada estudiante a cero visualmente
    Array.from(studentItems).forEach(studentItem => {
        const progressBar = studentItem.querySelector('.student-progress-bar');
        const progressText = studentItem.querySelector('.student-progress-text');
        const participationCount = studentItem.querySelector('.participation-count');

        progressBar.style.width = '0%';
        progressText.textContent = '0 / 20';
        participationCount.textContent = '0';
    });

    // Reinicia contadores globales
    totalParticipatingStudents = 0;
    updateMainProgress();

    // Guarda los estudiantes en localStorage con progreso en cero y recarga la página
    saveDataReset();
    location.reload(); // Recarga la página para reflejar el cambio
}

// Guarda el estado inicial de los estudiantes con progreso en cero
function saveDataReset() {
    const studentsContainer = document.getElementById('students-container');
    const students = [];

    // Guarda cada estudiante con progreso en 0
    studentsContainer.querySelectorAll('.student-item').forEach((studentItem) => {
        const name = studentItem.querySelector('.student-name').textContent;
        const progress = 0; // Reiniciamos el progreso a cero
        students.push({ name, progress });
    });

    localStorage.setItem('students', JSON.stringify(students));
}

// Guarda los datos actuales de los estudiantes en localStorage
function saveData() {
    const studentsContainer = document.getElementById('students-container');
    const students = [];

    studentsContainer.querySelectorAll('.student-item').forEach((studentItem) => {
        const name = studentItem.querySelector('.student-name').textContent;
        const progress = parseInt(studentItem.querySelector('.participation-count').textContent);
        students.push({ name, progress });
    });

    localStorage.setItem('students', JSON.stringify(students));
}

// Carga los datos de los estudiantes desde localStorage
function loadData() {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    totalStudents = 0;
    totalParticipatingStudents = 0;

    storedStudents.forEach(({ name, progress }) => {
        addStudent(name, progress);
    });

    updateMainProgress();
}

window.onload = loadData;
