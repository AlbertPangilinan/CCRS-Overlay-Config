require('dotenv').config()
const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs')
const path = require('path')
const url = require('url')

// Filepaths for json data
const config_path = process.env.CONFIG_FILENAME || path.join(process.env.PORTABLE_EXECUTABLE_DIR, 'config.json');
const teams_path = process.env.TEAMS_FILENAME || path.join(process.env.PORTABLE_EXECUTABLE_DIR, 'teams.json');;


// Reads config file from json
function readConfig() {
    const data = JSON.parse(fs.readFileSync(config_path, 'utf8'));
    console.log(data);
    return data;
}

// Reads teams file from json
function readTeams() {
    const data = JSON.parse(fs.readFileSync(teams_path, 'utf8'));
    console.log(data);
    return data;
}

function createWindow(userDisplay) {
  // Create the browser window.
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    useContentSize: true,
    icon: "./icon.ico",
    resizable: false,
    width: userDisplay.workAreaSize.width * 0.5,
    height: userDisplay.workAreaSize.height * 0.8,
    // maxWidth: userDisplay.workAreaSize.width,
    // maxHeight: userDisplay.workAreaSize.height,
    // minWidth: userDisplay.workAreaSize.width * 0.5,
    // minHeight: userDisplay.workAreaSize.height * 0.5,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  console.log(process.env.ELECTRON_START_URL);

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true,
  });

  // Load the index.html from a url
  win.loadURL(startUrl);

  // Open the DevTools.
  // win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    const { screen } = require('electron')
    // Get user screen size
    const userDisplay = screen.getPrimaryDisplay()

    ipcMain.handle('read-config', readConfig)
    ipcMain.handle('read-teams', readTeams)
    createWindow(userDisplay)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Handles saving config file
ipcMain.on('save-config', (event, data) => {
    console.log(data)
    const json = JSON.stringify(data);
    fs.writeFile(config_path, json, (e) => {
        if (e) throw e;
        console.log('Config saved!');
    });
})

// Handles saving teams file
ipcMain.on('save-teams', (event, data) => {
    console.log(data)
    const json = JSON.stringify(data);
    fs.writeFile(teams_path, json, (e) => {
        if (e) throw e;
        console.log('Teams saved!');
    });
})