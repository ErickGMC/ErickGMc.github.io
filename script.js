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

function addStudent() {
    const studentName = document.getElementById('optionName').value.trim();
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

    let studentProgress = 0;
    let hasParticipated = false;

    const participationCount = document.createElement("span");
    participationCount.className = "participation-count";
    participationCount.textContent = "0";

    const progressContainer = document.createElement("div");
    progressContainer.className = "student-progress-container";
    const progressBar = document.createElement("div");
    progressBar.className = "student-progress-bar";
    progressBar.style.backgroundColor = studentColor;
    const progressText = document.createElement("span");
    progressText.className = "student-progress-text";
    progressText.textContent = "0 / 20";

    progressContainer.appendChild(progressBar);
    progressContainer.appendChild(progressText);

    progressButton.onclick = () => {
        if (studentProgress < 20) {
            studentProgress++;
            const studentPercentage = (studentProgress / 20) * 100;
            progressBar.style.width = `${studentPercentage}%`;
            progressText.textContent = `${studentProgress} / 20`;
            participationCount.textContent = studentProgress;

            if (!hasParticipated) {
                totalParticipatingStudents++;
                hasParticipated = true;
                updateMainProgress();
            }
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
        }
    };

    editButton.onclick = () => {
        const newName = prompt("Editar nombre del estudiante:", studentName);
        if (newName) nameSpan.textContent = newName;
    };

    deleteButton.onclick = () => {
        studentsContainer.removeChild(studentItem);
        if (hasParticipated) {
            totalParticipatingStudents--;
            updateMainProgress();
        }
        totalStudents--;
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
    updateMainProgress();

    document.getElementById('optionName').value = "";
    document.getElementById('optionName').focus();
}
