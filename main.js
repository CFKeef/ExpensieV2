const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const path = require('path');

const {
  default: installExtension,
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS
} = require('electron-devtools-installer');

let mainWindow;

process.env.NODE_ENV = 'dev';

function init() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    backgroundColor: '#17181a',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    },
    frame: false,
    show: true,
    resize: false
  });
  mainWindow.webContents.openDevTools({ mode: 'detach' });

  installExtension(REDUX_DEVTOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err));

  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err));

  mainWindow.loadURL(
    process.env.NODE_ENV === 'dev'
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '/build/index.html')}`
  );

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
    mainWindow.webContents.openDevTools({ mode: 'detach' });
    
  });
}

app.on('ready', init);
