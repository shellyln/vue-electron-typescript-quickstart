
// Modules to control application life and create native browser window
import * as url from 'url';
import * as path from 'path';
import { app, protocol, Menu } from 'electron';


// Window

import { appConfig } from './lib/conf';
import { createMainWindow } from './windows/MainWindow';


// IPC events

import './ipc/app';
import './ipc/views.Home';


// Read the application config.
// tslint:disable-next-line:no-console
console.log('app config: ' + JSON.stringify(appConfig, null, 2));


if (app.isPackaged) {
    // Removing the menu bar from the window.
    Menu.setApplicationMenu(null);
}


// App lifecycle events.

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// tslint:disable-next-line:only-arrow-functions
app.on('ready', function() {
    protocol.interceptFileProtocol('file', (req, callback) => {
        let filePath = new url.URL(req.url).pathname;
        if (process.platform === 'win32') {
            if (filePath.match(/^\/[A-Za-z]:/)) {
                filePath = filePath.slice(1);
            }
            if (filePath.match(/^[A-Za-z]:\/(css|img|js)/)) {
                filePath = path.join(app.getAppPath(), 'dist', filePath.slice(3));
            } else if (filePath.match(/^[A-Za-z]:\/[^/\\]+?\.(js|css|png|jpeg|jpg|ico|svg)$/)) {
                // case of "vue-cli-service build --mode development"
                filePath = path.join(app.getAppPath(), 'dist', filePath.slice(3));
            }
        } else {
            if (filePath.match(/^\/(css|img|js)/)) {
                filePath = path.join(app.getAppPath(), 'dist', filePath.slice(1));
            } else if (filePath.match(/^\/[^/\\]+?\.(js|css|png|jpeg|jpg|ico|svg)$/)) {
                // case of "vue-cli-service build --mode development"
                filePath = path.join(app.getAppPath(), 'dist', filePath.slice(1));
            }
        }
        callback(path.normalize(filePath));
    });
    createMainWindow();
});


// Quit when all windows are closed.
// tslint:disable-next-line:only-arrow-functions
app.on('window-all-closed', function() {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


// tslint:disable-next-line:only-arrow-functions
app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    createMainWindow();
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
