"use strict";
/* AniManxwa - Windows ilovasi (Electron qobig'i).
   Ichidagi sahifalar (app/) mobil ilova bilan bir xil kod: app.js + style.css + desktop.js */
const { app, BrowserWindow, shell, Menu } = require("electron");
const path = require("path");

const SCHEME = "animanxwa";
let win = null, pending = null;

/* animanxwa://manhwa/nom/3 -> "manhwa/nom/3" (xavfsiz belgilar bilan) */
function linkOf(args) {
  const u = (args || []).find(x => typeof x === "string" && x.toLowerCase().startsWith(SCHEME + "://"));
  if (!u) return null;
  const m = /^animanxwa:\/\/([\w\-./%]+)$/i.exec(u.trim());
  return m ? m[1].replace(/\/+$/, "") : null;
}

function openLink(p) {
  if (!p) return;
  if (win && !win.webContents.isLoading()) {
    win.webContents.executeJavaScript("location.hash=" + JSON.stringify("#/" + p)).catch(() => {});
  } else pending = p;
}

function create() {
  Menu.setApplicationMenu(null);
  win = new BrowserWindow({
    width: 1320, height: 840, minWidth: 900, minHeight: 600,
    backgroundColor: "#000000", title: "AniManxwa", show: false, autoHideMenuBar: true,
    icon: path.join(__dirname, "app", "icon-512.png"),
    webPreferences: {
      contextIsolation: true, nodeIntegration: false, sandbox: true, devTools: false, spellcheck: false,
      webSecurity: false /* ilova faqat o'z fayllarini va o'z serverini ochadi; server (CORS) cheklovi kerak emas */
    }
  });
  /* skrinshot va ekran yozib olishda oyna qora ko'rinadi (mobildagi FLAG_SECURE ga o'xshash) */
  win.setContentProtection(true);
  win.once("ready-to-show", () => win.show());

  const first = linkOf(process.argv) || pending;
  pending = null;
  win.loadFile(path.join(__dirname, "app", "index.html"), first ? { hash: "/" + first } : {});

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) shell.openExternal(url);
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (e, url) => {
    if (!url.startsWith("file:")) {
      e.preventDefault();
      if (/^https?:\/\//i.test(url)) shell.openExternal(url);
    }
  });
  win.webContents.on("before-input-event", (e, i) => {
    if (i.type !== "keyDown") return;
    if (i.key === "F11") { win.setFullScreen(!win.isFullScreen()); e.preventDefault(); }
    else if (i.key === "F5" || (i.control && i.key.toLowerCase() === "r")) { win.reload(); e.preventDefault(); }
  });
  win.on("closed", () => { win = null; });
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on("second-instance", (e, argv) => {
    if (win) { if (win.isMinimized()) win.restore(); win.focus(); }
    openLink(linkOf(argv));
  });
  app.whenReady().then(() => {
    if (app.isPackaged) app.setAsDefaultProtocolClient(SCHEME);
    create();
  });
  app.on("window-all-closed", () => app.quit());
}
