const { contextBridge, ipcRenderer } = require('electron');
const net = require('net');
// 其他代码...

console.log('preload.js');

// window.electron.ipcRenderer.invoke(type, params).then(resp => {});
contextBridge.exposeInMainWorld('Electron', {
   ipcRenderer,
});
contextBridge.exposeInMainWorld('useAPI', {
   connect: (host, port) => {
      const socketInstance = new SocketInstance(host, port);
      return {
         send: socketInstance.send.bind(socketInstance),
         onReceive: socketInstance.onReceive.bind(socketInstance),
         close: socketInstance.close.bind(socketInstance),
         on: socketInstance.on.bind(socketInstance) // 在这里添加 on 方法


      };
   }
});

class SocketInstance {
   constructor(host, port) {
      this.socket = net.createConnection({ host, port });

   }
   // 新增的方法，允许外部添加事件监听器
   on(event, callback) {
      this.socket.on(event, callback);
   }
   send(message) {
      console.log(`Message from `,message);
      this.socket.write(message);
   }

   onReceive(callback) {
      this.socket.on('data', (data) => {
         // console.log(`Data from ${this.socket.remoteAddress}:${this.socket.remotePort}:`, data.toString());
         callback(data.toString());
      });
   }

   close() {
      this.socket.end();
   }
}








