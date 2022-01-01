/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 17/12/2021 - 23:50:39
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/12/2021
    * - Author          : 
    * - Modification    : 
**/

const path = require('path');
const { app, BrowserWindow, ipcMain, contextBridge, ipcRenderer, protocol, session, Menu  } = require('electron');
const isDev = require('electron-is-dev');
require('dotenv').config();
const fs = require("fs");
const Protocol = require("./protocol");
const Store = require("secure-electron-store").default;
var client = require('electron-connect').client;
const { machineId } = require("node-machine-id")
let win = null;
// const useMachine = () => ({
//   get value(){
//      return this.value
//   },
//   set value(v) {
//       this.value = v.replace(/[-]/g, '');
//   }
// })
const machine_data = {
  id:""
}
// const RESOURCES_PATH = app.isPackaged
// ? path.join(process.resourcesPath, 'assets')
// : path.join(__dirname, '../../assets');
// const getAssetPath = (paths) => {
//   return path.join(RESOURCES_PATH, ...paths);
// };

function createw_indow() {
  const store = new Store({
    path: app.getPath("userData")
  });

  if (!isDev) {
    // Needs to happen before creating/loading the browser window;
    // protocol is only used in prod
    protocol.registerBufferProtocol(Protocol.scheme, Protocol.requestHandler); /* eng-disable PROTOCOL_HANDLER_JS_CHECK */
  }

  win = new BrowserWindow({
    show: true,
    width: 1001,
    hasShadow: false,
    height: 554,
    frame: false,
    resizable: false,
    transparent: true,
    // icon: getAssetPath('icon.png'),
    webPreferences: {
      // devTools: isDev,
      nodeIntegration: true,
      // nodeIntegrationInWorker: false,
      // nodeIntegrationInSubFrames: false,
      // contextIsolation: true,
      // enableRemoteModule: false,
      // additionalArguments: [`storePath:${app.getPath("userData")}`],
      // preload: "./preload.js", /* eng-disable PRELOAD_JS_CHECK */
      // disableBlinkFeatures: "Auxclick"
    }
  });
  // const URL = isDev
  //   ? `http://localhost:${process.env.PORT}/`
  //   : `dup://${path.join(__dirname, '../dist/index.html')}`;
    const callback = function (success, initialStore) {
      console.log(`${!success ? "Un-s" : "S"}uccessfully retrieved store in main process.`);
      console.log(initialStore); // {"key1": "value1", ... }
    };

    store.mainBindings(ipcMain, win, fs, callback);
       // Load app
   if (isDev) {
    win.loadURL(`http://localhost:${process.env.PORT}`);
  } else {
    win.loadURL(`${Protocol.scheme}://rse/index.html`);
  }
  client.create(win);
}

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  } else {
    store.clearMainBindings(ipcMain);
  }
});
protocol.registerSchemesAsPrivileged([{
  scheme: Protocol.scheme,
  privileges: {
    standard: true,
    secure: true
  }
}]);
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

machineId(true).then((id)=>{
  ipcMain.on('toggle-devtools', (event, bool) => toggleDevTools(bool));
  ipcMain.on('miminize', (event, bool) => win.minimize());
  ipcMain.on('exit', (event, bool) => app.quit());
  ipcMain.handle('id', async (event, bool) => id);
})

app.whenReady().then(() => {
  protocol.registerFileProtocol('dup', (request, callback) => { 
    const url = request.url.substr(7)
     callback({ path: path.normalize(`${__dirname}/${url}`) });
    });
    createw_indow();
});
