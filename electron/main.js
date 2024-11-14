import { app, BrowserWindow } from "electron";

import url from "url";

import path from "path";

let __filename = url.fileURLToPath(import.meta.url);

let __dirname = path.dirname(__filename);

//创建窗口

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000, //设置窗口宽度(单位:像素)

    height: 600, //设置窗口高度

    icon: "electron/resource/images/code.ico", //设置窗口图标

    autoHideMenuBar: true, //隐藏菜单栏

    webPreferences: {
      //网页偏好设置

      nodeIntegration: true, //允许在渲染进程中直接使用 Node.js API

      contextIsolation: true, //启用上下文隔 (提高安全性)

      preload: path.resolve(__dirname, "preload.mjs"), //预加载脚本
    },
  });

  //mainWindow.webContents.openDevTools() //打开开发者工具

  //mainWindow.loadURL("http://localhost:5173")

  //VITE_DEV_SERVER_URL 是开发服务器的 url, 只在开发环境中存在
  if (process.env["VITE_DEV_SERVER_URL"]) {
    mainWindow.loadURL(process.env["VITE_DEV_SERVER_URL"]);
  } else {
    mainWindow.loadFile("dist/index.html");
    //mainWindow.loadFile(path.resolve(__dirname,"../dist/index.html"))
  }
};

//当应用准备就绪后创建窗口

//当应用准备就绪后创建窗口

app.whenReady().then(() => {
  createWindow();

  //在 macOS 系统内,若没有已开启的窗口,点击托盘图标时会重新创建一个新窗口
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

//若不是在 macOS 上运行,则关闭所有窗口时退出应用
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
