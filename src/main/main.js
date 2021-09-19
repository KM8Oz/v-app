
const path = require('path');
const { app, BrowserWindow, ipcMain, contextBridge, ipcRenderer } = require('electron');
const isDev = require('electron-is-dev');
require('dotenv').config();

let win = null;
// const RESOURCES_PATH = app.isPackaged
// ? path.join(process.resourcesPath, 'assets')
// : path.join(__dirname, '../../assets');
// const getAssetPath = (paths) => {
//   return path.join(RESOURCES_PATH, ...paths);
// };

function createw_indow() {
  win = new BrowserWindow({
    show: true,
    width: 1001,
    hasShadow:false,
    height: 554,
    frame:false,
    resizable:false,
    transparent: true, 
    // icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });
  const URL = isDev
    ? `http://localhost:${process.env.PORT}`
    : `file://${path.join(__dirname, '../dist/index.html')}`;

  win.loadURL(URL);
}

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
function toggleDevTools(bool) {
  if (win) {
    if (bool !== undefined) {
      bool
        ? win.webContents.openDevTools()
        : win.webContents.closeDevTools();
    } else {
      win.webContents.toggleDevTools();
    }
  }
}


ipcMain.on('toggle-devtools', (event, bool) => toggleDevTools(bool));
ipcMain.on('miminize', (event, bool) => win.minimize());
ipcMain.on('exit', (event, bool) =>  app.quit());

app.whenReady().then(createw_indow);
