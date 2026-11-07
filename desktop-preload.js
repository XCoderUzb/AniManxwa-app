const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("axDesk", { protect: on => ipcRenderer.send("protect", !!on) });
