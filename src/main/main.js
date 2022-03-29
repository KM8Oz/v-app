/**
 * 主进程入口文件
 */
const path = require('path');
const { app, BrowserWindow, ipcMain, Tray, nativeImage, Menu } = require('electron');
const isDev = require('electron-is-dev');
require('dotenv').config();
// const Store = require("secure-electron-store").default;
// const { machineId } = require("node-machine-id")

let win = null;

function createw_indow() {
  // 创建浏览器窗口
  // const callback = function (success, initialStore) {
  //   console.log(`${!success ? "Un-s" : "S"}uccessfully retrieved store in main process.`);
  //   console.log(initialStore); // {"key1": "value1", ... }
  // };
  let nativeImg = nativeImage.createFromPath(path.join(__dirname,'/icon.ico'))
    tray = new Tray(nativeImg)
  win = new BrowserWindow({
    width: 1001,
    hasShadow: false,
    backgroundColor: '#00000000',
    height: 554,
    frame: false,
    resizable: false,
    transparent: true,
    zoomToPageWidth:false,
    maximizable:false,
    webPreferences: {
      // devTools:false,
      nodeIntegration: true,
    },
  });
  // store.mainBindings(ipcMain, win, fs, callback);
  const URL = isDev
    ? `http://localhost:${process.env.PORT}`
    : `file://${path.join(__dirname, '../dist/index.html')}`;
    
    
    // tray.setImage(nativeImg, []);
    // const contextMenu = Menu.buildFromTemplate([
    //   { label: 'Item1', type: 'radio' },
    //   { label: 'Item2', type: 'radio' },
    //   { label: 'Item3', type: 'radio', checked: true },
    //   { label: 'Item4', type: 'radio' }
    // ])
    // tray.setToolTip('')
    // tray.setContextMenu(contextMenu)
  win.loadURL(URL);
}
app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  } 
});
// 切换 DevTools
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
ipcMain.on('exit', (event, bool) => app.quit());
ipcMain.handle('downloads', (event, args) => app.getPath("downloads"));
ipcMain.on('toggle-devtools', (event, bool) => toggleDevTools(bool));

app.whenReady().then(createw_indow);
