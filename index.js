'user strict';
const electron      = require('electron');
const app           = electron.app;

let mainWindow = null;

app.on('window-all-closed', function() {
    app.quit();
});

app.on('ready', function() {
  mainWindow = new electron.BrowserWindow({width: 1000, height: 850});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
