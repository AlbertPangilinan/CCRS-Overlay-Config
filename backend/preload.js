const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    readConfig: (data) => ipcRenderer.invoke('read-config', data),
    saveConfig: (data) => ipcRenderer.send('save-config', data),
    readTeams: (data) => ipcRenderer.invoke('read-teams', data),
    saveTeams: (data) => ipcRenderer.send('save-teams', data)
});