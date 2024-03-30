// Storage 
export let storage;

// Getting Storage
export function getStorage(){
    if (localStorage.getItem("storage") === null){
        storage = [];
    } else { storage = JSON.parse(localStorage.getItem("storage")); };
};

// Saving To Storage
export function saveToStorage(item){
    getStorage();

    storage.push(item);

    localStorage.setItem("storage", JSON.stringify(storage));
};