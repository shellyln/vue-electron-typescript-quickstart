
import * as path from 'path';
import { app, BrowserWindow, shell } from 'electron';
import { registerWindow, unregisterWindow, isRegistered, getWindow } from '../lib/SimpleWindowManager';



const userContentWindowSymbol = Symbol();


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

export function createUserContentWindow() {
    // UserContentWindow is singleton.
    if (isRegistered(userContentWindowSymbol)) {
        return getWindow(userContentWindowSymbol);
    }

    // Create the browser window.
    let userContentWindow: BrowserWindow | null = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(app.getAppPath(), 'src.preload/preload-for-user-contents.js'),
        },
        width: 800,
        height: 600,
    });
    registerWindow(userContentWindowSymbol, userContentWindow);

    // and load the html of the app.
    userContentWindow.loadURL('https://shellyln.github.io/');

    userContentWindow.webContents.session.webRequest.onHeadersReceived((details: any, callback: any) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                // tslint:disable-next-line:max-line-length
                'Content-Security-Policy': ['default-src \'self\'; style-src \'self\' \'unsafe-inline\'; img-src \'self\''],
            },
        });
    });

    userContentWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
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
    // userContentWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    userContentWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        unregisterWindow(userContentWindowSymbol);
        userContentWindow = null;
    });

    userContentWindow.webContents.on('new-window', (event: any, url: string) => {
        event.preventDefault();
        if (url.match(/^https?:\/\//)) {
            shell.openExternal(url);
        }
    });

    return userContentWindow;
}
