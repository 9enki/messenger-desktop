'user strict';

const {app}           = require('electron');
const {crashReporter} = require('electron');
const {BrowserWindow} = require('electron');

crashReporter.start({
  productName: 'electron_test',
  companyName: 'tkb3',
  submitURL: 'no',
  uploadToServer: false
});


app.on('window-all-closed', () => {
    app.quit();
});

let mainWindow = null;
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    width: 1000,
    height: 850,
    'icon': __dirname + '/messenger.ico'
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
