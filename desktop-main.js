const { app, BrowserWindow, Menu, shell, ipcMain } = require("electron");
const path = require("path");
let win;
const isLink = u => /^animanxwa:/i.test(u || "");
const openLink = u => { if (win && isLink(u)) win.webContents.executeJavaScript("window.axOpen&&window.axOpen(" + JSON.stringify(u) + ")").catch(() => {}); };
if (!app.requestSingleInstanceLock()) app.quit();
else {
  app.on("second-instance", (e, argv) => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } openLink(argv.find(isLink)); });
  app.setAsDefaultProtocolClient("animanxwa");
  app.whenReady().then(() => {
    Menu.setApplicationMenu(null);
    win = new BrowserWindow({ width: 1280, height: 820, minWidth: 900, minHeight: 600, backgroundColor: "#0b0b0c", title: "AniManxwa",
      icon: path.join(__dirname, "build", "icon.ico"), webPreferences: { preload: path.join(__dirname, "preload.js"), contextIsolation: true, nodeIntegration: false } });
    win.setContentProtection(true); // o'qishda rasmlarni yozib olishdan himoya (Admin sozlamasi bo'yicha o'zgaradi)
    win.loadFile(path.join(__dirname, "www", "index.html"));
    win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/i.test(url)) shell.openExternal(url); return { action: "deny" }; });
    win.webContents.on("will-navigate", (e, url) => { if (!url.startsWith("file:")) { e.preventDefault(); if (/^https?:/i.test(url)) shell.openExternal(url); } });
    ipcMain.on("protect", (e, on) => win.setContentProtection(!!on));
    win.webContents.once("did-finish-load", () => setTimeout(() => openLink(process.argv.find(isLink)), 1500));
  });
  app.on("window-all-closed", () => app.quit());
}
