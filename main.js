// Modules to control application life and create native browser window
const { session, app, BrowserWindow, ipcMain } = require('electron')
const { ElectronBlocker } = require('@cliqz/adblocker-electron');
const fetch = require('cross-fetch'); 
 

const electronLocalshortcut = require('electron-localshortcut');
const path = require('path')

function createWindow () {
  // Create the browser window.
  var mainWindow = new BrowserWindow({
    backgroundColor: 'transparent',
    width: 1200,
    height: 700,
    transparent: true, 

    webPreferences: {
      webviewTag: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  global.mainWindow = mainWindow;

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.removeMenu()

  electronLocalshortcut.register(mainWindow, 'Ctrl+Tab', () => { mainWindow.webContents.send('cycleTab', false); });
  electronLocalshortcut.register(mainWindow, 'Ctrl+Shift+Tab', () => { mainWindow.webContents.send('cycleTabBack', false); });

  electronLocalshortcut.register(mainWindow, 'Ctrl+W', () => { mainWindow.webContents.send('closeTab', false); })

  electronLocalshortcut.register(mainWindow, 'Ctrl+T', () => {  mainWindow.webContents.send('newTab', false);  })
  electronLocalshortcut.register(mainWindow, 'Ctrl+R', () => {  mainWindow.webContents.send('refreshTab', false);  })
  electronLocalshortcut.register(mainWindow, 'Ctrl+L', () => {  mainWindow.webContents.send('toggleBarre', true);  })
  electronLocalshortcut.register(mainWindow, 'Ctrl+N', () => { createWindow() })

  session.defaultSession.setUserAgent("Chrome");

   ipcMain.on('openTheater', function (event, store) { 
       mainWindow.loadFile('theater.html')
       setTimeout(function(){ mainWindow.webContents.send('watch', store) }, 500)
    });

    ipcMain.on('openStadium', function (event, store) { 
        mainWindow.loadFile('stadium.html')
    });


  ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => { blocker.enableBlockingInSession(session.defaultSession); });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.commandLine.appendSwitch('disable-site-isolation-trials')
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
