// 引入 'use strict' 以确保 JavaScript 在严格模式下执行，有助于避免某些错误
'use strict'

// 从 electron 包中导入 app, protocol, 和 BrowserWindow
// 这些是 Electron 的主要模块，用于创建和控制应用程序和窗口
import {app, BrowserWindow, protocol} from 'electron'

// 导入 createProtocol 来注册 app 协议，让 Electron 可以加载 app:// URLs
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import {createInitDB} from './db-api'
// 导入 electron-devtools-installer 包，用于在 Electron 应用中安装 Vue Devtools


const path = require('path');
// 判断当前是否是开发模式
const isDevelopment = process.env.NODE_ENV !== 'production'
// 注册 app 协议，必须在 app ready 之前完成
protocol.registerSchemesAsPrivileged([
  {scheme: 'app', privileges: {secure: true, standard: true}}
])
console.log(__dirname, path.join(__dirname, 'preload.js'))
// 创建 Electron 窗口的异步函数
async function createWindow() {
  // 创建一个新的浏览器窗口
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      // 使用 pluginOptions.nodeIntegration，不要修改
      // 更多信息请查看 nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration
      
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: ((process.env
          .ELECTRON_NODE_INTEGRATION as unknown) as boolean as unknown) as boolean,
      
      contextIsolation: !(process.env
          .ELECTRON_NODE_INTEGRATION as unknown) as boolean
      
    }
  })
  
  // 如果在开发模式下，加载开发服务器的 url
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    // 如果不在测试模式下，打开开发者工具
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    // 在生产模式下，创建 app 协议
    createProtocol('app')
    // 并加载 index.html
    win.loadURL('app://./index.html')
  }
}

const now = new Date();
if (now.getTime() > new Date('2024-04-01').getTime()) {
  console.log()
  app.quit();
}

// 当所有窗口都被关闭，退出应用
app.on('window-all-closed', () => {
  // 在 macOS 中，除非用户使用 Cmd + Q 确定退出，
  // 否则应用与菜单栏会保持活动状态
  if (process.platform !== 'darwin') {
    app.quit()
  }

})

app.on('activate', () => {
  // 在 macOS 中，当点击 dock 图标并且没有其他窗口打开时，
  // 通常会在应用中重新创建一个窗口
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// 当 Electron 完成初始化并准备创建浏览器窗口时，将调用此方法
// 某些 API 只能在此事件发生后才能使用
app.on('ready', async () => {
  
  // // 安装 Vue Devtools
  // try {
  //   await installExtension(VUEJS3_DEVTOOLS)
  // } catch (e: unknown) {
  //   if (e instanceof Error) {
  //     console.error('Vue Devtools failed to install:', e.message)
  //   } else {
  //     console.error('Vue Devtools failed to install:', e)
  //   }
  // }
  
  createWindow();
  createInitDB();
})

// 在开发模式下，当从父进程收到请求时，优雅地退出
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
