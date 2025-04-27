function showSection(sectionId) {
    // class hide ke liye
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // click karane pe selected section show hoga 
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

//  ye defult hai jab ham kholenge web app ko 👌👌
window.onload = function () {
    showSection('clock');
};

function toggleMenu() {
    const menu = document.getElementById('menuOptions');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Dark Mode me
function enableDarkMode() {
    document.body.classList.add('dark-mode');
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
}
// clock timer
setInterval(() => {
    const now = new Date();
    document.getElementById('currentTime').textContent = now.toLocaleTimeString();
}, 1000);

// watch
let hrs = document.getElementById("hrs")
let min = document.getElementById("min")
let sec = document.getElementById("sec")

//  digital Timer yaha pe time dikhega
setInterval(() => {
    let currentTime = new Date();

    hrs.innerHTML = (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
    min.innerHTML = (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
    sec.innerHTML = (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();
}, 1000);

// JavaScript "6 January 2025" date dikhega yaha pe
const today = new Date();
const day = today.getDate(); // Gets the day (6)
const month = today.toLocaleString('default', { month: 'long' });
const year = today.getFullYear();

const formattedDate = `${day} ${month} ${year}`;
document.getElementById('dateDiv').textContent = formattedDate;

// Alarm
let alarmTime = null;

function setAlarm() {
    alarmTime = document.getElementById('alarmTime').value;
    alert(`Alarm set for ${alarmTime}`);
}

setInterval(() => {
    const now = new Date();
    const currentTime = now.toTimeString().substr(0, 5);
    if (alarmTime === currentTime) {
        document.getElementById('alarmSound').play();
        document.getElementById('stopButton').style.display = 'block';  // stop button dikhega aur click karane se stop ho jayega alarm
        alert('Alarm ringing!');
        alarmTime = null;
    }
}, 1000);

// Timer
let timerInterval;
let totalTimerSeconds = 0;
let remainingTime = 0;
let isTimerPaused = false;

function startTimer() {
    const minutes = parseInt(document.getElementById('timerMinutes').value) || 0;
    const seconds = parseInt(document.getElementById('timerSeconds').value) || 0;
    totalTimerSeconds = minutes * 60 + seconds;
    remainingTime = totalTimerSeconds;

    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    isTimerPaused = false;
    document.getElementById('timerDisplay').textContent = `${minutes}:${seconds}`;
}

function updateTimer() {
    if (remainingTime > 0) {
        remainingTime--;
        const mins = Math.floor(remainingTime / 60).toString().padStart(2, '0');
        const secs = (remainingTime % 60).toString().padStart(2, '0');
        document.getElementById('timerDisplay').textContent = `${mins}:${secs}`;
    } else {
        clearInterval(timerInterval);
        document.getElementById('alarmSound').play();
        document.getElementById('stopButton').style.display = 'block';
        alert('Timer finished!');
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    isTimerPaused = true;
}

function resumeTimer() {
    if (isTimerPaused) {
        timerInterval = setInterval(updateTimer, 1000);
        isTimerPaused = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('timerDisplay').textContent = '00:00';
    isTimerPaused = false;
}

// Stopwatch
let stopwatchInterval;
let stopwatchTime = 0;

function startStopwatch() {
    if (stopwatchInterval) return;
    stopwatchInterval = setInterval(updateStopwatch, 10);
    document.getElementById('pauseStopwatchButton').style.display = 'inline-block';
    document.getElementById('resumeStopwatchButton').style.display = 'none';
    document.getElementById('startStopwatchButton').style.display = 'none';
}

function updateStopwatch() {
    stopwatchTime++;
    const hours = Math.floor(stopwatchTime / 360000).toString().padStart(2, '0');
    const minutes = Math.floor((stopwatchTime % 360000) / 6000).toString().padStart(2, '0');
    const seconds = Math.floor((stopwatchTime % 6000) / 100).toString().padStart(2, '0');
    const milliseconds = (stopwatchTime % 100).toString().padStart(3, '0');
    document.getElementById('stopwatchDisplay').textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function pauseStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    document.getElementById('resumeStopwatchButton').style.display = 'inline-block';
    document.getElementById('pauseStopwatchButton').style.display = 'none';
}

function resumeStopwatch() {
    if (!stopwatchInterval) {
        stopwatchInterval = setInterval(updateStopwatch, 10);
        document.getElementById('pauseStopwatchButton').style.display = 'inline-block';
        document.getElementById('resumeStopwatchButton').style.display = 'none';
    }
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    document.getElementById('stopwatchDisplay').textContent = '00:00:00:000';
    stopwatchInterval = null;
    document.getElementById('startStopwatchButton').style.display = 'inline-block';
    document.getElementById('pauseStopwatchButton').style.display = 'none';
    document.getElementById('resumeStopwatchButton').style.display = 'none';
}

// Bedtime
let bedtimeTime = null;

function setBedtime() {
    bedtimeTime = document.getElementById('bedtimeTime').value;
    alert(`Bedtime reminder set for ${bedtimeTime}`);
}

setInterval(() => {
    const now = new Date();
    const currentTime = now.toTimeString().substr(0, 5);
    if (bedtimeTime === currentTime) {
        document.getElementById('bedtimeSound').play();
        alert('Bedtime Reminder!');
        document.getElementById('stopButton').style.display = 'block';
        bedtimeTime = null;
        enableDarkMode();
    }
}, 1000);

// Stop Button 
function stopAudio() {

    document.getElementById('alarmSound').pause();
    document.getElementById('alarmSound').currentTime = 0;
    document.getElementById('bedtimeSound').pause();
    document.getElementById('bedtimeSound').currentTime = 0;

    // Hide stop button
    document.getElementById('stopButton').style.display = 'none';


    alarmTime = null;
    bedtimeTime = null;

    if (isMonitoringTemp && currentTemp > 43) {
        stopTempMonitoring();
    }
}

// Device Heating Monitor
let isMonitoringTemp = false;
let tempCheckInterval;
let currentTemp = 35;
let tempDirection = 1;

function startTempMonitoring() {
    if (isMonitoringTemp) return;
    isMonitoringTemp = true;
    document.getElementById('startTempButton').style.display = 'none';
    document.getElementById('stopTempButton').style.display = 'inline-block';

    tempCheckInterval = setInterval(() => {
        if (currentTemp >= 45) tempDirection = -1;
        if (currentTemp <= 35) tempDirection = 1;

        let change = (Math.random() * 0.3) * tempDirection;
        currentTemp += change;

        currentTemp = Math.min(Math.max(currentTemp, 35), 45);

        document.getElementById('tempDisplay').textContent = currentTemp.toFixed(1) + '°C';
        updateTempWarning(currentTemp);
    }, 1500);
}

function updateTempWarning(temp) {
    if (temp > 43) {
        document.getElementById('tempWarning').textContent = 'WARNING: Device temperature critical!';
        document.getElementById('tempWarning').style.color = 'red';
        document.getElementById('alarmSound').play();
        document.getElementById('stopButton').style.display = 'block';
    } else if (temp > 40) {
        document.getElementById('tempWarning').textContent = 'CAUTION: Device temperature high';
        document.getElementById('tempWarning').style.color = 'orange';
    } else {
        document.getElementById('tempWarning').textContent = 'Temperature Normal';
        document.getElementById('tempWarning').style.color = 'green';
    }
}

function stopTempMonitoring() {
    isMonitoringTemp = false;
    clearInterval(tempCheckInterval);
    document.getElementById('startTempButton').style.display = 'inline-block';
    document.getElementById('stopTempButton').style.display = 'none';
    document.getElementById('tempWarning').textContent = 'Monitoring Stopped';
    document.getElementById('tempWarning').style.color = 'grey';
    currentTemp = 35; // Reset temperature ke liye 
    document.getElementById('tempDisplay').textContent = currentTemp.toFixed(1) + '°C';
    document.getElementById('alarmSound').pause(); // Stop alarm jab bajega larm tab ke liye
    document.getElementById('stopButton').style.display = 'none';
}

// Note Reminde📝📝
let notes = [];

function addNote() {
    const noteText = document.getElementById('noteInput').value;
    const noteTime = document.getElementById('noteTime').value;

    if (!noteText || !noteTime) {
        alert('Please enter both note text and time!');
        return;
    }

    const note = {
        text: noteText,
        time: noteTime,
        id: Date.now()
    };

    notes.push(note);
    document.getElementById('noteInput').value = '';
    document.getElementById('noteTime').value = '';
    updateNotesList();
}

function updateNotesList() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note-item';
        noteElement.innerHTML = `
            <span>${note.text} - ${note.time}</span>
            <button onclick="deleteNote(${note.id})" class="delete-note">Delete</button>
        `;
        notesList.appendChild(noteElement);
    });
}

function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    updateNotesList();
}

setInterval(() => {
    const now = new Date();
    const currentTime = now.toTimeString().substr(0, 5);

    notes = notes.filter(note => {
        if (note.time === currentTime && !note.notified) {
            document.getElementById('alarmSound').play();
            alert(`Note Reminder: ${note.text}`);
            document.getElementById('stopButton').style.display = 'block';
            return false;
        }
        return true;
    });
}, 1000);

function expandInput(input) {
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
}
// kaisa laga code Bhai               😊😊