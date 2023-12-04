const { defineConfig } = require('@vue/cli-service')
const JavaScriptObfuscator = require('webpack-obfuscator')

module.exports = defineConfig({
  chainWebpack: config => {
    config.module
        .rule('js')
        .test(/\.jsx?$/)
        .use('babel-loader')
        .loader('babel-loader')
        .tap(options => {
          // 打印完整的选项以检查是否包含了babel配置文件中的设置
          console.log(JSON.stringify(options, null, 2), '_____________');
          return options;
        });
    
  },
  publicPath:'./',
  devServer: {
    allowedHosts: 'all',
  },
  // configureWebpack: {
  //
  //   devtool: 'cheap-module-source-map',
  //
  //   plugins: [
  //
  //     new JavaScriptObfuscator({
  //       compact: true,
  //       rotateStringArray: true,
  //       // 混淆后的代码,不能使用代码美化,同时需要配置 cpmpat:true;
  //       seed: 0,
  //       selfDefending: false,
  //       sourceMap: false,
  //       sourceMapBaseUrl: '',
  //       sourceMapFileName: '',
  //       sourceMapMode: 'separate',
  //
  //       },[])
  //
  //   ]
  //
  // },
  
  transpileDependencies: true,
  runtimeCompiler: true,
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      builderOptions: {
        asar: true,
        // build配置在此处
        productName: 'HSBiologicalFermentation',
        // options placed here will be merged with default configuration and passed to electron-builder
        extraResources: [
          "./src/database.db"
        ],
        win: {  // 更改build下选项
          icon: "./src/assets/image/hospitable.ico",
          publisherName: "LuChengLong", // 发布者名称
        },
        // NSIS配置放在这里
        nsis: {
          // 是否一键安装，建议为 false，可以让用户点击下一步、下一步、下一步的形式安装程序，如果为true，当用户双击构建好的程序，自动安装程序并打开，即：一键安装（one-click installer）
          oneClick: false,
          // 是否开启安装时权限限制（此电脑或当前用户）
          perMachine: false,
          // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowElevation: false,
          // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
          allowToChangeInstallationDirectory: true,
          // 卸载时删除用户数据
          deleteAppDataOnUninstall: true,
          // 安装图标
          installerIcon: './src/assets/image/hospitable.ico',
          // 卸载图标
          uninstallerIcon: './src/assets/image/hospitable.ico',
          // 安装时头部图标
          installerHeaderIcon: './src/assets/image/hospitable.ico',
          // 创建桌面图标
          createDesktopShortcut: true,
          // 创建开始菜单图标
          createStartMenuShortcut: true
        }
      }
    }
  }
})

