const { contextBridge, ipcRenderer } = require('electron');

// 其他代码...

console.log('preload.js');

// window.electron.ipcRenderer.invoke(type, params).then(resp => {});
contextBridge.exposeInMainWorld('electron', {
   ipcRenderer,
});