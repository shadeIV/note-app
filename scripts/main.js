// Storage Functions
import { storage, getStorage, saveToStorage } from "./storage.js";

// Rendering Notes
function renderNotes(){
    const notesDiv = window.top.document.querySelector(".notes-section"); 
    let notesHTML = ""; //Null

    getStorage();

    storage.forEach((note) => {
        notesHTML += `
        <button class="note-item">
            <p class="note-item-name">${note.title}</p>
        </button> 
        `;
    });

    notesDiv.innerHTML = notesHTML;
};

// Startup Code
renderNotes();