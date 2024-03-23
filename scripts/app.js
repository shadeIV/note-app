// Electron 
const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

// Window 
let window;

// Creating the Window 
function createWindow(){
    window = new BrowserWindow({
        resizable: false,
        width: 900,
        height: 600,
        autoHideMenuBar: true
    });
    
    window.loadURL(
        url.format({
            protocol: "file:",
            slashes: true,
            pathname: path.join(__dirname, "../html/main.html")
        })
    );
};

// Launching the App
app.on("ready", () => {
    createWindow();
});