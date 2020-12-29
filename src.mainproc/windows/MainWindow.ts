
import * as path from 'path';
import { app, BrowserWindow, shell } from 'electron';
import { registerWindow, unregisterWindow, isRegistered, getWindow } from '../lib/SimpleWindowManager';



const mainWindowSymbol = Symbol();


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

export function createMainWindow() {
    // MainWindow is singleton.
    if (isRegistered(mainWindowSymbol)) {
        return getWindow(mainWindowSymbol);
    }

    // Create the browser window.
    let mainWindow: BrowserWindow | null = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,             // Electron 11: default is false
            nodeIntegrationInWorker: false,     // Electron 11: default is false
            nodeIntegrationInSubFrames: false,  // Electron 11: default is false
            enableRemoteModule: false,          // Electron 11: default is false
            contextIsolation: true,
            preload: path.join(app.getAppPath(), 'src.preload/preload-isolated.js'),
        },
        width: 800,
        height: 600,
    });
    registerWindow(mainWindowSymbol, mainWindow);

    // and load the html of the app.
    mainWindow.loadFile(path.join(app.getAppPath(), 'dist/main-window.html'));

    // CSP is not work while the location scheme is 'file'.
    // And when if navigated to http/https, CSP is to be enabled.
    if (app.isPackaged) {
        mainWindow.webContents.session.webRequest.onHeadersReceived((details: any, callback: any) => {
            const headers = {...details.responseHeaders};
            for (const key of Object.keys(headers)) {
                if (key.toLowerCase() === 'content-security-policy') {
                    delete headers[key];
                }
                if (key.toLowerCase() === 'x-content-security-policy') {
                    delete headers[key];
                }
            }
            callback({
                responseHeaders: {
                    ...headers,
                    'content-security-policy': [
                        `default-src 'none';` +
                        `frame-ancestors 'none';`,
                    ],
                },
            });
        });
    } else {
        // NOTE: Remove CSP to use devtools.
        //   Refused to load the script 'devtools://devtools/bundled/shell.js'
        //   because it violates the following Content Security Policy directive: "default-src 'none'.
        mainWindow.webContents.session.webRequest.onHeadersReceived((details: any, callback: any) => {
            callback({
                responseHeaders: {
                    ...details.responseHeaders,
                },
            });
        });
    }

    mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
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
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        unregisterWindow(mainWindowSymbol);
        mainWindow = null;
    });

    mainWindow.webContents.on('new-window', (event: any, url: string) => {
        event.preventDefault();
        if (url.match(/^https?:\/\//)) {
            shell.openExternal(url);
        }
    });

    return mainWindow;
}
