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
}

// Rendering Notes
function renderNotes() {
    const notesDiv = window.top.document.querySelector(".notes-section");
    let notesHTML = ""; //Null

    getStorage();

    storage.forEach((note) => {
        notesHTML += `
        <button data-note-id="${note.id}" class="note-item">
            <p class="note-item-name">${note.title}</p>
        </button> 
        `;
    });

    notesDiv.innerHTML = notesHTML;
};

// Create Button
document.querySelector(".menu-create-button").addEventListener("click", () => {
    mode = "create";
    document.querySelector(".title-input").value = "";
    document.querySelector(".description-input").value = "";
});

// Save Button
document.querySelector(".save-button").addEventListener("click", () => {
    let noteTitle = document.querySelector(".title-input").value;
    let noteDescription = document.querySelector(".description-input").value;

    if (mode === "view") {
        getStorage();
        storage.forEach((note, noteIndex) => {
            if (note.id == currentNoteId) {
                storage[noteIndex] = { title: noteTitle, description: noteDescription, id: note.id };
                localStorage.setItem("storage", JSON.stringify(storage));
                renderNotes();
                renderButtons();
            };
        });
    }

    else if (mode === "create") {
        let newId = generateRandomId();
        let newNote = { title: noteTitle, description: noteDescription, id: newId };
        saveToStorage(newNote);
        renderNotes();
        renderButtons();
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
                    document.querySelector(".title-input").value = note.title;
                    document.querySelector(".description-input").value = note.description;
                    currentNoteId = note.id;
                    console.log(currentNoteId);
                };
            });

        });
    });
};

// Startup Code
renderNotes();
renderButtons();