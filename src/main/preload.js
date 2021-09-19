const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('dup', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-dup', 'ping');
    },
    exit() {
      ipcRenderer.send('ipc-dup', 'exit');
    },
    miminize() {
      ipcRenderer.send('ipc-dup', 'minimize');
    },
    on(channel, func) {
      const validChannels = ['ipc-dup'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-dup'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
