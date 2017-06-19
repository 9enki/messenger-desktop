'use strict';

// TODO 画像保存せずにIPCでindex.jsにnativeImage

const fs = require('fs');
const canvasBuffer = require('electron-canvas-to-buffer')

const canvas = document.createElement('canvas');
canvas.height = 140;
canvas.width  = 140;

const remote   = require('electron').remote;
const app      = remote.app;
const webview  = document.getElementById('mainWebview');
let title = '';
let unreadCount = '';
let previousUnreadCount = '';
const os = (() => {
  if((process.platform).match(/win/)) {
    return 'win';
  }
  else {
    return 'mac';
  }
})();

setInterval(() => {
  title = webview.getTitle();
  if(title.match(/Messenger/)) {
    let reg_result = title.match(/\(\d\)/);
    previousUnreadCount = unreadCount;
    if (reg_result) {
      unreadCount = Number(reg_result[0].match(/\d/)[0]);
    }
    else {
      unreadCount = '';
    }

    if (unreadCount != previousUnreadCount) {
      if (os == 'win') {
        if (0 < Number(unreadCount)) {
          let ctx = canvas.getContext('2d');
          ctx.fillStyle = 'red';
          ctx.beginPath();
          ctx.ellipse(70, 70, 70, 70, 0, 0, 2 * Math.PI);
          ctx.fill();
          ctx.textAlign = 'center';
          ctx.fillStyle = 'white';
          if (unreadCount.length > 2) {
            ctx.font = '75px sans-serif';
            ctx.fillText('' + unreadCount, 70, 98);
          }
          else if (unreadCount.length > 1) {
            ctx.font = '100px sans-serif';
            ctx.fillText('' + unreadCount, 70, 105);
          }
          else {
            ctx.font = '125px sans-serif';
            ctx.fillText('' + unreadCount, 70, 112);
          }
          const badgeDataURL = canvas.toDataURL();
          const buffer = canvasBuffer(canvas, 'image/png');
          fs.writeFileSync(__dirname+'/test.png', buffer);
          const mainWindow = remote.getCurrentWindow();
          mainWindow.setOverlayIcon(__dirname+'/test.png', "count");
        }
        else {
          const mainWindow = remote.getCurrentWindow();
          mainWindow.setOverlayIcon(null, "count");
        }
      }
      else {
        setBadgeCount(unreadCount);
      }
    }
  }
}, 3000);

webview.addEventListener('new-window', (e) => {
  require('electron').shell.openExternal(e.url);
});
