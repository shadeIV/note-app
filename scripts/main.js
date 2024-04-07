// Storage Functions
import { storage, getStorage, saveToStorage } from "./storage.js";

// Varibles
let mode = "create";
let currentNoteId = "";


// Generating Random Id
function generateRandomId() {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 10; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
};

// Getting Date
function getDate() {
    var currentDate = new Date();

    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    var hour = currentDate.getHours();
    var minute = currentDate.getMinutes();

    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;

    var formattedDateTime = `${day}/${month}/${year} - ${hour}:${minute}`;

    return formattedDateTime;
};

// Rendering Notes
function renderNotes() {
    const notesDiv = window.top.document.querySelector(".notes-section");
    let notesHTML = ""; //Null

    getStorage();

    if (storage.length != 0) {
        storage.forEach((note) => {
            notesHTML += `
        <button data-note-id="${note.id}" class="note-item">
            <p class="note-item-name">${note.title}</p>
        </button> 
        `;
        });

        notesDiv.innerHTML = notesHTML;
    }
    else if (storage.length === 0){
        notesDiv.innerHTML = `<p class="null-p">There are no notes...</p>`
    };

};

// Create Button
document.querySelector(".menu-create-button").addEventListener("click", () => {
    document.title = "Note App | Create Note";
    currentNoteId = "";
    mode = "create";
    document.querySelector(".title-input").value = "";
    document.querySelector(".description-input").value = "";
    document.querySelector(".date-p").innerHTML = getDate();
});

// Save Button
document.querySelector(".save-button").addEventListener("click", () => {

    let noteTitle = document.querySelector(".title-input").value;
    let noteDescription = document.querySelector(".description-input").value;

    if (noteTitle || noteDescription) {

        let date = getDate();

        document.title = "Note App | Saved";

        if (!noteTitle) {
            noteTitle = "Untitled";
        };

        if (mode === "view") {
            getStorage();
            storage.forEach((note, noteIndex) => {
                if (note.id == currentNoteId) {
                    storage[noteIndex] = { title: noteTitle, description: noteDescription, id: note.id, date: note.date };
                    localStorage.setItem("storage", JSON.stringify(storage));
                    renderNotes();
                    renderButtons();
                };
            });
        }

        else if (mode === "create") {
            let newId = generateRandomId();
            let newNote = { title: noteTitle, description: noteDescription, id: newId, date: date };
            saveToStorage(newNote);
            mode = "view";
            currentNoteId = newId;
            renderNotes();
            renderButtons();
        };

    };
});

// Delete Button
document.querySelector(".delete-button").addEventListener("click", () => {
    if (mode === "view") {
        getStorage();
        storage.forEach((note, noteIndex) => {
            if (note.id === currentNoteId) {
                storage.splice(noteIndex, 1);
                localStorage.setItem("storage", JSON.stringify(storage));

                renderNotes();
                renderButtons();

                document.title = "Note App | Create Note"
                currentNoteId = "";
                mode = "create";
                document.querySelector(".search-input").value = "";
                document.querySelector(".title-input").value = "";
                document.querySelector(".description-input").value = "";
                document.querySelector(".date-p").innerHTML = getDate();
            };
        });
    }

    else if (mode === "create") {
        document.querySelector(".title-input").value = "";
        document.querySelector(".description-input").value = "";
        document.querySelector(".date-p").innerHTML = getDate();
    };

});

// Rendering Buttons
function renderButtons() {
    let noteButtons = document.querySelectorAll(".note-item");
    noteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            mode = "view";

            let noteId = button.dataset.noteId;

            getStorage();
            storage.forEach((note) => {
                if (note.id === noteId) {
                    document.title = "Note App | View Note";
                    document.querySelector(".title-input").value = note.title;
                    document.querySelector(".description-input").value = note.description;
                    document.querySelector(".date-p").innerHTML = note.date;
                    currentNoteId = note.id;
                };
            });

        });
    });
};

// Search Box
document.querySelector(".search-input").addEventListener("keyup", () => {

    if (document.querySelector(".search-input").value != "") {
        let searchKey = document.querySelector(".search-input").value.toLowerCase();

        let filteredNotes = [];

        getStorage();
        storage.forEach((note) => {
            if (note.title.toLowerCase().indexOf(`${searchKey}`) != -1) {
                filteredNotes.push(note);
            };
        });

        let notesHTML = ""; // Null

        filteredNotes.forEach((note) => {
            notesHTML += `
            <button data-note-id="${note.id}" class="note-item">
                <p class="note-item-name">${note.title}</p>
            </button> 
        `;
        });

        const notesDiv = window.top.document.querySelector(".notes-section");
        notesDiv.innerHTML = notesHTML;

        renderButtons();
    }
    else { renderNotes(); renderButtons(); }

});

// Inputs on Change
document.querySelector(".title-input").addEventListener("keydown", () => {
    document.title = "Note App | Unsaved";
});
document.querySelector(".description-input").addEventListener("keydown", () => {
    document.title = "Note App | Unsaved";
});

// Startup Code
renderNotes();
renderButtons();

document.querySelector(".date-p").innerHTML = getDate();