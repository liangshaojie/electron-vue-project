'use strict'

import { app, BrowserWindow } from 'electron'
import pkg from './../../package.json'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// 设置appId才能使用Notification
if (process.platform === 'win32') {
  app.setAppUserModelId(pkg.build.appId)
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

const previewIcon = process.env.NODE_ENV === 'development' ? 'static/images/tray.ico' : `${global.__static}/images/tray.ico`
const prevIcon = process.env.NODE_ENV === 'development' ? 'static/images/prev.png' : `${global.__static}/images/prev.png`
const nextIcon = process.env.NODE_ENV === 'development' ? 'static/images/next.png' : `${global.__static}/images/next.png`
const playIcon = process.env.NODE_ENV === 'development' ? 'static/images/play.png' : `${global.__static}/images/play.png`
const pauseIcon = process.env.NODE_ENV === 'development' ? 'static/images/pause.png' : `${global.__static}/images/pause.png`

// 设置底部任务栏按钮和缩略图
const setThumbarButtons = function (mainWindow, playing) {
  mainWindow.setThumbarButtons([{
    tooltip: '上一曲',
    icon: prevIcon,
    click () {
      mainWindow.webContents.send('prev-play')
    }
  },
  {
    tooltip: playing ? '暂停' : '播放',
    icon: playing ? pauseIcon : playIcon,
    click () {
      mainWindow.webContents.send('toggle-play', {
        value: !playing
      })
    }
  },
  {
    tooltip: '下一曲',
    icon: nextIcon,
    click () {
      mainWindow.webContents.send('next-play')
    }
  }
  ])
}

function createWindow () {
  mainWindow = new BrowserWindow({
    icon: previewIcon,
    height: 690,
    useContentSize: true,
    width: 1000,
    minWidth: 992,
    minHeight: 670,
    frame: false,
    show: true,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webSecurity: false,
      navigateOnDragDrop: true
      // devTools: false
    }
  })

  mainWindow.setMenu(null)

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
