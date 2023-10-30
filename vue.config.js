const { defineConfig } = require('@vue/cli-service')
const JavaScriptObfuscator = require('webpack-obfuscator')

module.exports = defineConfig({
  publicPath:'./',
  devServer: {
    host: '0.0.0.0',
    // https:true,
    port: 6103,
    client: {
      webSocketURL: 'ws://0.0.0.0:6103/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  configureWebpack: {
    
    devtool: 'cheap-module-source-map',
    
    plugins: [
      
      new JavaScriptObfuscator({
        
        rotateStringArray: true
        
      },[])
    
    ]
    
  },
  
  transpileDependencies: true,
  runtimeCompiler: true,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // build配置在此处
        // options placed here will be merged with default configuration and passed to electron-builder
        "extraResources": [
          "./src/database.db",
          "./src/preload.js",

        ]
      }
    },
    nsis: {
      // NSIS的路径包括自定义安装程序的脚本。默认为build/installer.nsh
      include: 'build/installer.nsh',
      // 是否一键安装，建议为 false，可以让用户点击下一步、下一步、下一步的形式安装程序，如果为true，当用户双击构建好的程序，自动安装程序并打开，即：一键安装（one-click installer）
      oneClick: false,
      // 是否开启安装时权限限制（此电脑或当前用户）
      perMachine: true,
      // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
      allowElevation: true,
      // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
      allowToChangeInstallationDirectory: true,
      // 卸载时删除用户数据
      deleteAppDataOnUninstall: true,
      // 安装图标
      // installerIcon: 'build/installerIcon_120.ico',
      // 卸载图标
      // uninstallerIcon: 'build/uninstallerIcon_120.ico',
      // 安装时头部图标
      // installerHeaderIcon: 'build/installerHeaderIcon_120.ico',
      // 创建桌面图标
      createDesktopShortcut: true,
      // 创建开始菜单图标
      createStartMenuShortcut: true
    }
  
  },
})

