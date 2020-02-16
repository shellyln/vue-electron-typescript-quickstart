
import * as path from 'path';
import { app, BrowserWindow, shell } from 'electron';
import { registerWindow, unregisterWindow } from '../lib/SimpleWindowManager';



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

export function createSubWindow() {
    // Create the browser window.
    let subWindow: BrowserWindow | null = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(app.getAppPath(), 'src.preload/preload.js'),
        },
        width: 800,
        height: 600,
    });
    registerWindow(subWindow, subWindow);

    // and load the html of the app.
    subWindow.loadFile(path.join(app.getAppPath(), 'dist/sub-window.html'));

    // CSP is not work while the location scheme is 'file'.
    // And when if navigated to http/https, CSP is to be enabled.
    if (app.isPackaged) {
        subWindow.webContents.session.webRequest.onHeadersReceived((details: any, callback: any) => {
            callback({
                responseHeaders: {
                    ...details.responseHeaders,
                    'Content-Security-Policy': ['default-src \'none\''],
                },
            });
        });
    } else {
        // NOTE: Remove CSP to use devtools.
        //   Refused to load the script 'devtools://devtools/bundled/shell.js'
        //   because it violates the following Content Security Policy directive: "default-src 'none'.
        subWindow.webContents.session.webRequest.onHeadersReceived((details: any, callback: any) => {
            callback({
                responseHeaders: {
                    ...details.responseHeaders,
                },
            });
        });
    }

    subWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
        // const url = webContents.getURL();
        //
        // if (permission === 'notifications') {
        //     // Approves the permissions request
        //     callback(true);
        // }
        // if (!url.startsWith('https://my-website.com')) {
        //     // Denies the permissions request
        //     return callback(false);
        // }
        return callback(false);
    });

    // Open the DevTools.
    // subWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    subWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        unregisterWindow(subWindow as BrowserWindow);
        subWindow = null;
    });

    subWindow.webContents.on('new-window', (event: any, url: string) => {
        event.preventDefault();
        if (url.match(/^https?:\/\//)) {
            shell.openExternal(url);
        }
    });

    return subWindow;
}
