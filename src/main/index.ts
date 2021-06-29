import { app, BrowserWindow } from 'electron'
import path from 'path'

class Main {
  public static winURL = 'http://localhost:9080'
  public static winPath = `file:///${__dirname}/index.html`.replaceAll('\\', '/') // './dist/index.html'
  public static mainWindow: BrowserWindow

  public static main(): void {
    app.on('ready', (): void => {
      Main.createWindow()
    })

    app.on('activate', function () {
      if(BrowserWindow.getAllWindows().length === 0) {
        Main.createWindow()
      }
    })
    
    app.on('window-all-closed', function () {
      if(process.platform !== 'darwin') {
        app.quit()
      }
    })
  }

  public static createWindow(): void {
    this.mainWindow = new BrowserWindow({
      width: 1024,
      height: 768,
      title: 'Minecraft TS',
      // icon: './assets/icon-32x32.png',
      center: true,
      useContentSize: true,
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: false
      }
    })

    if(process.env.NODE_ENV === 'development') this.mainWindow.loadURL(Main.winURL)
    else this.mainWindow.loadURL(Main.winPath)

    this.mainWindow.removeMenu()
  }
}

Main.main()